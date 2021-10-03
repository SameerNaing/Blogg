import type { NextApiRequest, NextApiResponse } from "next";

import getBlogPosts from "@/dbFunctions/getBlogPosts";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userID, avoid, lastID } = req.query;

  const blogs = await getBlogPosts(
    userID as string,
    avoid === "true",
    lastID as string
  );

  res.status(200).json(blogs);
}

export default handler;
