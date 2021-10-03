import { prismaMock } from "../prisma/singleton";
import searchBlogPost from "./searchBlogPost";

it("should return search result", async () => {
  const searchResult = [{ id: "1", title: "Some title" }];

  prismaMock.blog.findMany.mockResolvedValue(searchResult);

  await expect(searchBlogPost("S")).resolves.toEqual(searchResult);
});
