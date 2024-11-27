import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const status = await global.redisClient.get(req.query.email as string);
      res.status(200).json(status);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}