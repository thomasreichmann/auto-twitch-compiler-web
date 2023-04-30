import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Account } from "next-auth";

const ACCOUNTS = "accounts";

const accountRepository = {
  async findByUserId(userId: string | ObjectId): Promise<Account | null> {
    let client = await clientPromise;

    let account = client
      .db()
      .collection(ACCOUNTS)
      .findOne<Account>({ userId: new ObjectId(userId) });

    return account;
  },
};

export default accountRepository;
