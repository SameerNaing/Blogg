import { prismaMock } from "../prisma/singleton";
import addComment from "./addComment";

it("should add new comment", async () => {
  const comment = {
    id: "1",
    comment: "Amazing",
    userID: "0",
    blogID: "0",
    user: {
      id: "0",
      name: "Sam",
      image: "userimageUrl",
    },
  };

  prismaMock.comment.create.mockResolvedValue(comment);

  await expect(
    addComment(comment.userID, comment.comment, comment.blogID)
  ).resolves.toEqual({
    commentID: comment.id,
    userID: comment.userID,
    username: comment.user.name,
    userImg: comment.user.image,
    comment: comment.comment,
  });
});
