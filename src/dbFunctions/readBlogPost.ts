import prismaClient from "../prisma/client";

async function readBlogPost(blogID: string, userID: string) {
  const { blog, user, comment, like } = prismaClient;

  const blogData = await blog.findUnique({
    where: { id: blogID },
  });

  const blogAuthor = await user.findUnique({ where: { id: blogData!.userID } });

  const formattedBlog = {
    ...blogData,
    username: blogAuthor!.name,
    userImg: blogAuthor!.image,
  };

  const likes = await like.findMany({
    where: { blogID },
    select: { userID: true },
  });

  const comments = await comment.findMany({ where: { blogID } });
  const formattedComments = [];

  for await (let c of comments) {
    const userData = await user.findUnique({ where: { id: c.userID } });
    formattedComments.push({
      commentID: c.id,
      userID: userData!.id,
      username: userData!.name,
      userImg: userData!.image,
      comment: c.comment,
    });
  }

  const isLike = likes.map((l) => l.userID).includes(userID);
  const numLikes = likes.length;

  return { blog: formattedBlog, isLike, numLikes, comments: formattedComments };
}

export default readBlogPost;
