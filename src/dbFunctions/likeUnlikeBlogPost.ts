import prisma from "../prisma/client";

/** Returns true if user has already liked the blog else returns false */
async function checkIsLiked(userID: string, blogID: string) {
  const { like } = prisma;
  const likeData = await like.findFirst({
    where: {
      AND: [{ userID: { equals: userID } }, { blogID: { equals: blogID } }],
    },
  });
  return likeData !== null;
}

async function addRemoveLike(userID: string, blogID: string, isLike: boolean) {
  const { like } = prisma;
  isLike
    ? await like.create({ data: { userID, blogID } })
    : await like.deleteMany({
        where: {
          AND: [{ userID: { equals: userID } }, { blogID: { equals: blogID } }],
        },
      });
}

export { checkIsLiked, addRemoveLike };
