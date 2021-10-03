import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import type { NewSession } from "src/common/types/sessionType";
import addComment from "@/dbFunctions/addComment";
import checkMethod from "@/middleware/checkMethod";
import protectRoute from "@/middleware/protectRoute";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getSession({ req })) as NewSession;
  const { blogID, userComment } = req.body;

  const comment = await addComment(session.user.userID, userComment, blogID);

  res.status(200).json(comment);
}

export default protectRoute(checkMethod(handler, "POST"));
