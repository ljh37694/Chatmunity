import { connectDB } from "@/app/utils/datadbase";
import { Dm } from "@/types";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "./socket";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    let result = null;

    if (req.method === 'GET') {
      const limit: number = 30;

      const result = await db.collection<Dm>('dm').find({
        room_id: req.query.room_id,
      })
      .sort({ timestamp: -1 })
      .skip(parseInt(req.query.count as string) * limit)
      .limit(limit)
      .toArray();

      res.status(200).json(result);
    }

    else if (req.method === 'POST') {
      const result = await db.collection<Dm>('dm').insertOne(req.body);

      const message: Dm = JSON.parse(req.body);

      res.socket.server.io.emit('message', message.content);

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