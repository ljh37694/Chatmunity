import { connectDB } from "@/app/utils/datadbase";
import { Chat } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    const postId = req.query.post_id;

    let result = null;

    console.log(req.body);

    if (req.method === 'GET') {
      if (typeof postId === 'string') {
        result = await db.collection<Chat>('chat').find({ post_id: postId, root_chat: null }).toArray();
      }
    }

    else if (req.method === 'POST') {
      result = await db.collection<Chat>('chat').insertOne(req.body);
    }
          
    if (result) {
      res.status(200).json(result);
    }
    
    else {
      res.status(400).json({message: 'not found'});
    }
  } catch (e) {
    res.status(500).json(e);
  }
}