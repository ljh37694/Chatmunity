import { connectDB } from "@/app/utils/datadbase";
import { DmRoom, Post } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    if (req.method === 'GET' && typeof req.query._id === 'string') {
      const result = await db.collection<Post>('post').findOne({_id: new ObjectId(req.query._id)});

      res.status(200).json(result);
    } 
    
    else if (req.method === 'PUT' && typeof req.query.count === 'string' && typeof req.query.email === 'string' && typeof req.query.id === 'string') {
      const count = parseInt(req.query.count);
      let result;

      if (count === 1) {
        result = await db.collection<Post>('post').updateOne({
          _id: new ObjectId(req.query.id),
        }, {
          $inc: { likes: count },
          $push: { like_users: req.query.email },
        });
      } else {
        result = await db.collection<Post>('post').updateOne({
          _id: new ObjectId(req.query.id),
        }, {
          $inc: { likes: count },
          $pull: { like_users: req.query.email },
        });
      }

      res.status(200).json(result);
    }
    
    else {
      res.status(400).json({ message: 'Post not found' });
    }

  } catch (e) {
    res.status(500).json(e);
  }
}