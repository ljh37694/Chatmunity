import { connectDB } from "@/app/utils/datadbase";
import { DmRoom, Friend, Post } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (req.method === 'GET') {
      if (typeof req.query.email === 'string' && typeof req.query.post_id === 'string') {
        const result = await db.collection<Post>('post').findOne<Post>({
          _id: new ObjectId(req.query.post_id),
          like_users: {
            $in: [req.query.email as string],
          },
        });

        res.status(200).json(result);
      }
    }
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
}