import {
  setStatus,
  setBlogPost,
  setNumLikes,
  setIsLike,
  setCommentStatus,
  setComments,
  addComment,
} from "./readBlog-slice";

import {
  getBlogPost,
  commentBlogPost,
  likeUnlikeBlogPost,
} from "@/modules/ReadBlog/api";
import { Status } from "@/common/constants/status";

const getBlogAction = (blogID: string) => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading));
  try {
    const data = await getBlogPost(blogID);

    dispatch(
      setBlogPost({
        blogData: data.blog.blogData,
        username: data.blog.username,
        userImg: data.blog.userImg,
      })
    );

    dispatch(setIsLike(data.isLike));
    dispatch(setNumLikes(data.numLikes));
    dispatch(setComments(data.comments));
    dispatch(setStatus(Status.Loaded));
  } catch (e) {
    dispatch(setStatus(Status.Error));
  }
};

const commentAction =
  (comment: string, blogID: string) => async (dispatch: Function) => {
    dispatch(setCommentStatus(Status.Loading));

    try {
      const data = await commentBlogPost(comment, blogID);

      dispatch(
        addComment({
          commentID: data.commentID,
          userID: data.userID,
          username: data.username,
          userImg: data.userImg,
          comment: data.comment,
        })
      );
      dispatch(setCommentStatus(Status.Loaded));
    } catch (e) {
      dispatch(setCommentStatus(Status.Error));
    }
  };

const likeUnlikeAction =
  (blogID: string, prevIsLike: boolean, prevNumLike: number) =>
  async (dispatch: Function) => {
    dispatch(setIsLike(!prevIsLike));
    dispatch(setNumLikes(!prevIsLike ? prevNumLike + 1 : prevNumLike - 1));
    try {
      await likeUnlikeBlogPost(blogID, !prevIsLike);
    } catch (e) {
      console.log(e);
    }
  };

export { getBlogAction, commentAction, likeUnlikeAction };
