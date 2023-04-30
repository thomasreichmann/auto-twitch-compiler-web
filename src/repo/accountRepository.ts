import { getCollection } from "@/lib/repo";
import { ObjectId } from "mongodb";
import { Account } from "next-auth";

const ACCOUNTS = "accounts";

class AccountRepository {
  async findByUserId(userId: string | ObjectId): Promise<Account | null> {
    let collection = await getCollection<Account>(ACCOUNTS);

    let account = collection.findOne({ userId: new ObjectId(userId) });

    return account;
  }
}

export default new AccountRepository();
