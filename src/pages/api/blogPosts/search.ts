import type { NextApiRequest, NextApiResponse } from "next";

import checkMethod from "@/middleware/checkMethod";
import searchBlogPost from "@/dbFunctions/searchBlogPost";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword } = req.query;
  const data = await searchBlogPost(keyword as string);
  return res.status(200).json(data);
}

export default checkMethod(handler, "GET");
