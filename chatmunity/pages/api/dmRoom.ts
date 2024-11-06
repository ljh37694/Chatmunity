import { connectDB } from "@/app/utils/datadbase";
import { DmRoom } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (req.method === 'GET') {
      // const users = JSON.parse(req.query.member as string);

      // const result = await db.collection<DmRoom>('dmRoom').findOne({
      //   member: {
      //     $all: [
      //       { $elemMatch: { email: users[0] }},
      //       { $elemMatch: { email: users[1] }},
      //     ]
      //   }
      // });

      const result = await db.collection<DmRoom>('dmRoom').findOne<DmRoom>({
        _id: new ObjectId(req.query.room_id as string),
      });

      res.status(200).json(result);
    }

    else if (req.method === 'POST') {
      const result = await db.collection<DmRoom>('dmRoom').insertOne(req.body);

      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}