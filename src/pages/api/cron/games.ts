import { NextApiRequest, NextApiResponse } from "next";
import csvParser from "csv-parser";
import { PassThrough } from "stream";
import { getCollection } from "@/lib/repo";
import { AvailableGame } from "@/services/infoService";

if (!process.env.TWITCH_CLIENT_ID) {
  throw new Error("Please add your twitch client id to .env.local");
}
if (!process.env.TWITCH_CLIENT_SECRET) {
  throw new Error("Please add your twitch client secret to .env.local");
}

export const config = {
  maxDuration: 60,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Getting token");
    const urlWithQueryParams = new URL("https://id.twitch.tv/oauth2/token");
    urlWithQueryParams.searchParams.append("client_id", process.env.TWITCH_CLIENT_ID!);
    urlWithQueryParams.searchParams.append("client_secret", process.env.TWITCH_CLIENT_SECRET!);
    urlWithQueryParams.searchParams.append("grant_type", "client_credentials");

    let fRes = await fetch(urlWithQueryParams.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fRes.ok) {
      throw new Error(`Failed to fetch token: ${fRes.statusText}`);
    }

    let auth = await fRes.json();
    let accessToken = auth.access_token;

    console.log("Getting dump");
    let dumpRes = await fetch("https://api.igdb.com/v4/dumps/games", {
      method: "GET",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!dumpRes.ok) {
      throw new Error(`Failed to fetch dump: ${dumpRes.statusText}`);
    }

    let dr = await dumpRes.json();
    let dumpUrl: string = dr.s3_url;
    console.log(`Dump URL: ${dumpUrl}`);

    console.log("Streaming CSV");

    const response = await fetch(dumpUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const contentLength = response.headers.get("Content-Length");
    const totalSize = contentLength ? parseInt(contentLength, 10) : null;
    let loadedSize = 0;

    const results: any[] = [];
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    async function processStream() {
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          loadedSize += value.length;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            // Push each line to the results array
            results.push(line);
          }
          if (totalSize) {
            console.log(`Progress: ${((loadedSize / totalSize) * 100).toFixed(2)}%`);
          } else {
            console.log(`Loaded ${loadedSize} bytes`);
          }
        }
      }
    }

    await processStream();

    // Convert CSV lines to JSON using csv-parser
    const stream = new PassThrough();
    stream.end(results.join("\n"));
    const jsonResults: any[] = [];

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on("data", (data) => jsonResults.push(data))
        .on("end", async () => {
          console.log("CSV parsing completed");

          // Get the collection and perform the update
          let collection = await getCollection<AvailableGame>("games");

          // Clear the existing collection
          console.log("Deleting current collection games");
          await collection.deleteMany({});

          // Insert new items
          console.log("Adding new games to collection");
          await collection.insertMany(jsonResults);

          console.log("Collection updated successfully");
          resolve(res.status(200).json(jsonResults));
        })
        .on("error", (error) => {
          console.error("Error during CSV parsing", error);
          reject(res.status(500).json({ error: error.message }));
        });
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
