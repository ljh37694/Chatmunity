import { connectDB } from "@/app/utils/datadbase";
import { DmRoom, Friend } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (req.method === 'GET') {
      const result = await db.collection<Friend>('friend').find({
        user_id: req.query.user_id as string,
      }).toArray();

      res.status(200).json(result);
    }

    else if (req.method === 'POST') {
      const check = await db.collection<Friend>('friend').findOne({
        $or: [
          { user_id: req.body.user_id, friend_id: req.body.friend_id },
          { user_id: req.body.friend_id, friend_id: req.body.user_id },
        ],
      });

      if (check) {
        res.status(400).json({ message: '이미 친구입니다.' });

      } else {
        const result = await db.collection<Friend>('friend').insertMany(req.body);

        res.status(200).json(result);
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}