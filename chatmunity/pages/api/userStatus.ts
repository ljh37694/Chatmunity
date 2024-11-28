import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const user = global.userList.get(req.query.email as string);

      res.status(200).json(user);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}