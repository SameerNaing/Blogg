import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import type { NewSession } from "src/common/types/sessionType";
import checkMethod from "@/middleware/checkMethod";
import protectRoute from "@/middleware/protectRoute";
import publishBlog from "@/dbFunctions/publishBlog";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getSession({ req })) as NewSession;
  const userID = session.user.userID;
  const { title, displayImgUrl, blogData, imageStorageRef } = req.body;

  try {
    await publishBlog(title, userID, blogData, displayImgUrl, imageStorageRef);
  } catch (e) {
    return res.status(500).json({});
  }

  return res.status(200).json({});
}

export default protectRoute(checkMethod(handler, "POST"));
