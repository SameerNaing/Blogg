import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import type { NewSession } from "src/common/types/sessionType";
import checkMethod from "@/middleware/checkMethod";
import protectRoute from "@/middleware/protectRoute";
import { checkIsLiked, addRemoveLike } from "@/dbFunctions/likeUnlikeBlogPost";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getSession({ req })) as NewSession;
  const userID = session.user.userID;
  const { blogID, isLike } = req.body;
  const isLiked = await checkIsLiked(userID, blogID);

  if (isLike) {
    !isLiked && addRemoveLike(userID, blogID, true);
  } else {
    isLiked && addRemoveLike(userID, blogID, false);
  }
  res.status(200).json({});
}

export default protectRoute(checkMethod(handler, "POST"));
