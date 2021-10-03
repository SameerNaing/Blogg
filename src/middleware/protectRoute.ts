import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

const protectRoute =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).json({});
    }

    return handler(req, res);
  };

export default protectRoute;
