import { connectDB } from "@/app/utils/datadbase";
import { DmRoom } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "./socket";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (req.method === 'GET') {
      res.socket.server.io.socketsJoin(req.query.room_id as string);

      res.status(200).json({ message: "join: " + req.query.room_id});
    }
  } catch (e) {
    res.status(500).json(e);
  }
}