import { connectDB } from "@/app/utils/datadbase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDB;
    const db = client.db('Chatmunity');

    let result = null;

    if (req.method === 'GET') {

    }

    else if (req.method === 'POST') {
      
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