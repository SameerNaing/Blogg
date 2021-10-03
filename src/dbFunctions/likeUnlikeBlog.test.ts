import { prismaMock } from "../prisma/singleton";
import { checkIsLiked, addRemoveLike } from "./likeUnlikeBlogPost";

describe("likeUnlikeBlog tests", () => {
  it("should return false if user has not liked the blog post", async () => {
    prismaMock.like.findFirst.mockResolvedValue(null);
    const data = await checkIsLiked("1", "0");
    await expect(checkIsLiked("1", "0")).resolves.toBeFalsy();
  });

  it("should execute 'create' function", async () => {
    const likeCreateMock = prismaMock.like.create;
    likeCreateMock.mockResolvedValue({});

    await addRemoveLike("0", "1", true);

    expect(likeCreateMock.mock.results.length).toBe(1);
  });

  it("should execute 'deleteMany' function", async () => {
    const likeDeleteMock = prismaMock.like.deleteMany;
    likeDeleteMock.mockResolvedValue({});

    await addRemoveLike("0", "1", false);

    expect(likeDeleteMock.mock.results.length).toBe(1);
  });
});
