import { NextApiRequest, NextApiResponse } from "next";
import { fetch } from "next/dist/compiled/@edge-runtime/primitives";
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

  const results: any[] = [];
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  async function processStream() {
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader!.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          // Push each line to the results array
          results.push(line);
        }
      }
    }
  }

  await processStream();

  // Convert CSV lines to JSON using csv-parser
  const stream = new PassThrough();
  stream.end(results.join("\n"));
  const jsonResults: any[] = [];

  stream
    .pipe(csvParser())
    .on("data", (data) => jsonResults.push(data))
    .on("end", async () => {
      // Get the collection and perform the update
      let collection = await getCollection<AvailableGame>("games");

      // Clear the existing collection
      await collection.deleteMany({});

      // Insert new items
      await collection.insertMany(jsonResults);

      console.log("Collection updated successfully");
      res.status(200).json(jsonResults.length);
    })
    .on("error", (error) => {
      console.error("Error during CSV parsing", error);
      res.status(500).json({ error: error.message });
    });
}
