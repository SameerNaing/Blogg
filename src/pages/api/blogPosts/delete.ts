import type { NextApiRequest, NextApiResponse } from "next";

import checkMethod from "@/middleware/checkMethod";
import protectRoute from "@/middleware/protectRoute";
import deleteBlogPost from "@/dbFunctions/deleteBlogPost";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blogID } = req.query;

  const imageStorageRef = await deleteBlogPost(blogID as string);

  console.log({ blogID, imageStorageRef });

  res.status(200).json({ imageStorageRef });
}

export default protectRoute(checkMethod(handler, "DELETE"));
