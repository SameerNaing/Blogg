import prisma from "../prisma/client";

async function deleteBlogPost(blogID: string) {
  const { blog } = prisma;
  const data = await blog.delete({ where: { id: blogID } });
  return data!.imageStorageRef;
}

export default deleteBlogPost;
