import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import readBlogPost from "@/dbFunctions/readBlogPost";
import { NewSession } from "src/common/types/sessionType";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getSession({ req })) as NewSession;
  const { blogID } = req.query;

  const blog = await readBlogPost(
    blogID as string,
    session ? session.user.userID : ""
  );

  res.json(blog);
}

export default handler;
