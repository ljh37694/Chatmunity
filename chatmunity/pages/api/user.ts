import { connectDB } from "@/app/utils/datadbase";
import { UserData } from "@/types";
import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    if (req.method === "GET") {
      const result = await db.collection<UserData>('user').findOne({ email: req.query.email });

      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}