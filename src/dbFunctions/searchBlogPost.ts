import prismaClient from "../prisma/client";

async function searchBlogPost(keyword: string) {
  const { blog } = prismaClient;
  const data = await blog.findMany({
    where: { title: { contains: keyword } },
    select: { id: true, title: true },
  });
  return data;
}

export default searchBlogPost;
