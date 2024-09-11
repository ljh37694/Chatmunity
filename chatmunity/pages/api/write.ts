import { Post } from "@/app/post/[id]/page";
import { connectDB } from "@/app/utils/datadbase";
import { Db, InsertOneResult, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    console.log(req.body.title);

    if (req.method === 'POST') { 
      const result: InsertOneResult = await db.collection<Post>('post').insertOne({
        title: req.body.title,
        content: req.body.content,
      });
    
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}