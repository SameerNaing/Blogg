import prismaClient from "../prisma/client";
import formatDate from "../utils/formatDate";

async function getBlogPost(
  userID: string | undefined = undefined,
  avoid: boolean | undefined = undefined,
  lastID: string | undefined = undefined
) {
  const { blog, user } = prismaClient;

  /** where filter object */
  const where: any = {};

  /** decide what type of filters should be put inside where object */
  if (avoid !== null && userID) {
    where.userID = {};
    avoid ? (where.userID.not = userID) : (where.userID.equals = userID);
  }

  /** pagination cursor */
  const cursor: any = {};

  /** if lastID is not null put last id inside cursor object */
  if (lastID) {
    cursor.cursor = {};
    cursor.cursor.id = lastID;
  }

  /** Get blog posts from database */
  const blogs = await blog.findMany({
    take: 5,
    skip: lastID ? 1 : 0,
    ...cursor,
    orderBy: { date: "desc" },
    where,
    select: {
      id: true,
      title: true,
      image: true,
      date: true,
      userID: true,
      blogData: false,
      imageStorageRef: false,
    },
  });

  /** empty array to put formatted blog data */
  const formattedData = [];

  for await (let b of blogs) {
    const userData = await user.findUnique({
      where: { id: b.userID },
      select: { image: true, name: true },
    });
    formattedData.push({
      ...b,
      date: formatDate(b.date),
      userName: userData!.name,
      userImg: userData!.image,
    });
  }

  return formattedData;
}

export default getBlogPost;
