import { prismaMock } from "../prisma/singleton";
import readBlogPost from "./readBlogPost";

it("should return blog post data for reading", async () => {
  const blogData = {
    id: "0",
    userID: "1",
    title: "Blog Title",
    blogData: "data",
  };

  const userData = {
    id: "2",
    name: "Sam",
    email: "sam@gmail.com",
    image: "user_img",
  };

  const likesData = [{ userID: userData.id, blogID: blogData.id }];

  const commentData = {
    id: "1",
    comment: "Some Comment",
    userID: userData.id,
    blogData: blogData.id,
  };

  prismaMock.blog.findUnique.mockResolvedValue(blogData);
  prismaMock.user.findUnique.mockResolvedValue(userData);
  prismaMock.like.findMany.mockResolvedValue(likesData);
  prismaMock.comment.findMany.mockResolvedValue([commentData]);

  await expect(readBlogPost(blogData.id, userData.id)).resolves.toEqual({
    blog: {
      id: blogData.id,
      userID: blogData.userID,
      title: blogData.title,
      blogData: blogData.blogData,
      username: userData.name,
      userImg: userData.image,
    },
    numLikes: 1,
    isLike: true,
    comments: [
      {
        commentID: commentData.id,
        userID: userData.id,
        username: userData.name,
        userImg: userData.image,
        comment: commentData.comment,
      },
    ],
  });
});
