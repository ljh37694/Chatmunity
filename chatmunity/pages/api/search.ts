import { connectDB } from "@/app/utils/datadbase";
import { Post } from "@/types";
import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    if (req.method === "GET") {
      if (req.query.query) {
        const result = await db.collection<Post>('post').find({ title: { $regex: req.query.query as string, $options: 'i' } });

        res.status(200).json(result);
      }

    }
  } catch (e) {
    res.status(500).json(e);
  }
}