import { connectDB } from "@/app/utils/datadbase";
import { DmRoom, Post } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (typeof req.query._id === 'string') {
      const result = await db.collection<Post>('post').findOne({_id: new ObjectId(req.query._id)});

      res.status(200).json(result);
    } 
    
    else if (req.method === 'PUT') {
      const result = await db.collection<Post>('post').updateOne({
        _id: new ObjectId(req.query.id as string),
      }, {
        $inc: { likes: parseInt(req.query.count as string) },
      });

      res.status(200).json(result);
    }
    
    else {
      res.status(400).json({ message: 'Post not found' });
    }

  } catch (e) {
    res.status(500).json(e);
  }
}