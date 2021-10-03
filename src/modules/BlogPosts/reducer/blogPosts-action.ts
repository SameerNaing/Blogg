import { deleteObject, ref, getStorage } from "firebase/storage";

import { Status } from "@/common/constants/status";
import { fetchPaginatedBlog, deleteBlog } from "@/modules/BlogPosts/api";
import {
  appendBlogPosts,
  noMoreData,
  setStatus,
  removeBlogPost,
} from "./blogPosts-slice";

/** Fetch blogs */
const fetchBlogAction =
  (
    userID: string | null,
    avoid: boolean | null,
    preRenderLastBlog: DisplayBlog | null,
    paginateLastBlog: DisplayBlog | null
  ) =>
  async (dispatch: Function) => {
    dispatch(setStatus(Status.Loading));

    /** blog post last id */
    let lastID;
    /** decide whether to choose last blog post id from prerender blog or paginateblog or set null */
    if (preRenderLastBlog && paginateLastBlog) {
      lastID = paginateLastBlog.id;
    } else if (paginateLastBlog) {
      lastID = paginateLastBlog.id;
    } else if (preRenderLastBlog) {
      lastID = preRenderLastBlog.id;
    } else {
      lastID = null;
    }

    try {
      const blogPosts = await fetchPaginatedBlog(userID, avoid, lastID);
      if (blogPosts.length === 0) {
        dispatch(setStatus(Status.Loaded));
        dispatch(noMoreData());
      } else {
        dispatch(setStatus(Status.Loaded));
        dispatch(appendBlogPosts(blogPosts));
      }
    } catch (e) {
      dispatch(setStatus(Status.Error));
    }
  };

/** Delete blog */
const deleteBlogAction = (blogID: string) => async (dispatch: Function) => {
  dispatch(removeBlogPost(blogID));
  try {
    const { imageStorageRef } = await deleteBlog(blogID);
    const storage = getStorage();
    const desertRef = ref(storage, imageStorageRef);
    await deleteObject(desertRef);
  } catch (e) {}
};

export { fetchBlogAction, deleteBlogAction };
