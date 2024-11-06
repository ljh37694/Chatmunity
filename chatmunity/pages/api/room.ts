import { connectDB } from "@/app/utils/datadbase";
import { Room } from "@/types";
import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    if (req.method === "GET") {
      const result = await db.collection<Room>('room').findOne<Room>({ _id: req.query.room_id });

      res.status(200).json(result);
    }

    else if (req.method === "POST") {
      const result = await db.collection<Room>('room').findOne({ id: req.body.id });
      console.log(result);

      if (result) {
        res.status(400).json({ message: "duplicated id"});
      } else {
        const insertResult = await db.collection<Room>('room').insertOne(req.body);
        res.status(200).json(insertResult);
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}