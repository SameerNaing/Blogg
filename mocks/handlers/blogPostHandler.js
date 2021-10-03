import { rest } from "msw";

import blogPosts from "../data/blogPosts";
import blog from "../data/readBlog";

const blogPostHandlers = [
  rest.get("/api/blogPosts", async (req, res, ctx) => {
    const lastID = req.url.searchParams.get("lastID");

    if (!lastID) {
      return res(ctx.json(blogPosts.slice(0, 5)));
    }

    const index = blogPosts.findIndex((b) => b.id === lastID);

    if (index < 0) {
      return res(ctx.json([]));
    }

    return res(ctx.json(blogPosts.slice(index + 1, index + 6)));
  }),
  rest.post("/api/publishBlog", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("/api/blogPosts/delete", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/blogPosts/search", async (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "0", title: "About Health" },
        { id: "1", title: "Async/Await in Javascript" },
      ])
    );
  }),
  rest.get("/api/blogPosts/:blogID", async (req, res, ctx) => {
    return res(ctx.json({ ...blog }));
  }),
  rest.post("/api/blogPosts/comment", async (req, res, ctx) => {
    const { comment } = req.body;
    return res(
      ctx.json({
        commentID: "200",
        userID: 1,
        username: "T",
        userImg:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        comment,
      })
    );
  }),
  rest.post("/api/blogPosts/likeUnlike", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export default blogPostHandlers;
