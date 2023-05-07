import { Collection, Document, ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export type MongoId = string | ObjectId;

export const getCollection = async <T extends Document>(
  name: string
): Promise<Collection<T>> => {
  let client = await clientPromise;

  return client.db().collection<T>(name);
};
