import prisma from "../prisma/client";

async function addComment(userID: string, userComment: string, blogID: string) {
  const { comment } = prisma;

  const c = await comment.create({
    data: { userID, comment: userComment, blogID },
    select: { user: true, id: true },
  });

  return {
    commentID: c.id,
    userID,
    username: c.user.name,
    userImg: c.user.image,
    comment: userComment,
  };
}

export default addComment;
