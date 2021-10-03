import type { NextApiRequest, NextApiResponse } from "next";

const checkMethod =
  (handler: Function, method: string) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(400).json({});
    }
    return handler(req, res);
  };

export default checkMethod;
