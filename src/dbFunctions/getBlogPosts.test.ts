import { prismaMock } from "../prisma/singleton";
import getBlogPost from "./getBlogPosts";

it("should return formatted data from database", async () => {
  const blogPost = {
    id: "0",
    title: "blogTitle",
    image: "blogImg",
    date: new Date("2021-09-12"),
    userID: "1",
  };

  const userData = { image: "userImg", name: "Sam" };

  prismaMock.blog.findMany.mockResolvedValue([blogPost]);
  prismaMock.user.findUnique.mockResolvedValue(userData);

  await expect(getBlogPost()).resolves.toEqual([
    {
      id: blogPost.id,
      title: blogPost.title,
      image: blogPost.image,
      date: "12, Sep, 2021",
      userID: blogPost.userID,
      userName: userData.name,
      userImg: userData.image,
    },
  ]);
});
