import { MongoId, getCollection } from "@/lib/repo";
import { ObjectId } from "mongodb";
import { Account } from "next-auth";

const ACCOUNTS = "accounts";

class AccountRepository {
  async findByUserId(userId: MongoId): Promise<Account | null> {
    let collection = await getCollection<Account>(ACCOUNTS);

    let account = collection.findOne({ userId: new ObjectId(userId) });

    return account;
  }

  async updateAccount(userId: MongoId, account: Account) {
    let collection = await getCollection<Account>(ACCOUNTS);

    return collection.updateOne(
      { userId: new ObjectId(userId) },
      { $set: account }
    );
  }
}

export default new AccountRepository();
