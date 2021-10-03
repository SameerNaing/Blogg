import { prismaMock } from "../prisma/singleton";
import deleteBlogPost from "./deleteBlogPost";

test("should delete blog post and return image storage ref ", async () => {
  const blogData = {
    id: "0",
    imageStorageRef: "imagRef",
  };

  prismaMock.blog.delete.mockResolvedValue(blogData);

  await expect(deleteBlogPost(blogData.id)).resolves.toBe(
    blogData.imageStorageRef
  );
});
