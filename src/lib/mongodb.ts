import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClient) {
    console.log("Creating new MongoClient instance for development");
    global._mongoClient = new MongoClient(uri, options);
  } else {
    console.log("Reusing existing MongoClient instance in development");
  }
  client = global._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  // The MongoClient will manage the connection automatically.
  console.log("Creating new MongoClient instance for production");
  client = new MongoClient(uri, options);
}

// Export the MongoClient. It will auto-connect on its first operation.
export default client;
