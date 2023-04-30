import { Collection, Document } from "mongodb";
import clientPromise from "./mongodb";

export const getCollection = async <T extends Document>(
  name: string
): Promise<Collection<T>> => {
  let client = await clientPromise;

  return client.db().collection<T>(name);
};
