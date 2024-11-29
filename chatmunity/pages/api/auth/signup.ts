import { UserData } from "@/types";
import { Db } from "mongodb";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { connectDB } from "@/app/utils/datadbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await connectDB;
    const db: Db = client.db('Chatmunity');

    if (req.method === "POST") {
      const userData: UserData = req.body;

      const existingUser = await db.collection<UserData>('user').findOne({ email: userData.email });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (existingUser) {
        res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
        return;
      }

      else if (!passwordRegex.test(userData.password as string)) {
        res.status(400).json({ message: "올바르지 않은 비밀번호 형식입니다." });
        return;
      }

      else if (!emailRegex.test(userData.email as string)) {
        res.status(400).json({ message: "올바르지 않은 이메일 형식입니다." });
        return;
      }

      else {
        const hashedPassword = await bcrypt.hash(userData.password as string, 10);

        const result = await db.collection<UserData>('user').insertOne({ ...userData, password: hashedPassword });

        res.status(200).json(result);
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}