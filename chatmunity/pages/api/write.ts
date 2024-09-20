import { connectDB } from "@/app/utils/datadbase";
import { Post } from "@/types";
import { Db, InsertOneResult, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    console.log(req.body.title);

    if (req.method === 'POST') { 
      const { title, content } = req.body;
      if (!title || !content) {
        res.status(400).json({message: '제목 또는 내용이 빈칸입니다'});
      } else {
        const result: InsertOneResult = await db.collection<Post>('post').insertOne({
          title: req.body.title,
          content: req.body.content,
          likes: 0,
          views: 0,
          writer: req.body.writer,
          date: new Date().toString(),
        });
      
        res.status(200).json(result);
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}