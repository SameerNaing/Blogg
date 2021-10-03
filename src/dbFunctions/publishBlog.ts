import prisma from "../prisma/client";

async function publishBlog(
  title: string,
  userID: string,
  blogData: string,
  displayImgUrl: string,
  imageStorageRef: string
) {
  const { blog } = prisma;
  await blog.create({
    data: {
      userID,
      blogData,
      image: displayImgUrl,
      title,
      imageStorageRef,
    },
  });
}

export default publishBlog;
