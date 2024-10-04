import { connectDB } from "@/app/utils/datadbase";
import { Chat } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    const root_chat = req.query.root_chat;

    let result = null;

    console.log(req.body);

    if (req.method === 'GET') {
      if (typeof root_chat === 'string') {
          result = await db.collection<Chat>('chat').find({ root_chat: req.query.root_chat }).toArray();
      }
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