import { Collection, Document, ObjectId } from "mongodb";
import client from "./mongodb";

export type MongoId = string | ObjectId;

export const getCollection = async <T extends Document>(name: string): Promise<Collection<T>> => {
  return client.db().collection<T>(name);
};
