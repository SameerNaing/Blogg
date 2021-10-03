type ReadBlogPostModel = {
  blogData: string;
  username: string;
  userImg: string;
};

type CommentModel = {
  commentID: number;
  userID: number;
  username: string;
  userImg: string;
  comment: string;
};
