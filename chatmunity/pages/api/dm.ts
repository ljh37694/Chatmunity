import { connectDB } from "@/app/utils/datadbase";
import { Dm } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    let result = null;

    if (req.method === 'GET') {
      const result = await db.collection<Dm>('dm').find({
        room_id: req.query.room_id,
      })
    }

    else if (req.method === 'POST') {
      const result = await db.collection<Dm>('dm').insertOne(req.body);

      res.status(200).json(result);
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