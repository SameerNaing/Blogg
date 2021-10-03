import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { Status } from "@/common/constants/status";

interface BlogPostsState {
  paginatedBlogPosts: DisplayBlog[];
  status: Status;
  hasMore: boolean;
}

const initialState: BlogPostsState = {
  paginatedBlogPosts: [],
  status: Status.Initial,
  hasMore: true,
};

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    /** set all states to initial when user leaves the page */
    setInitial: (state) => (state = initialState),

    /** append paginate blogs  */
    appendBlogPosts: (state, action: PayloadAction<DisplayBlog[]>) => {
      state.paginatedBlogPosts.push(...action.payload);
    },

    /** set page status such as loading or loaded or error */
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },

    /** remove blog post from list when user deletes their blog post */
    removeBlogPost: (state, action: PayloadAction<string>) => {
      state.paginatedBlogPosts = state.paginatedBlogPosts.filter(
        (b) => b.id !== action.payload
      );
    },

    /** set hasMore to false when there is no data left to fetch and stop pagination */
    noMoreData: (state) => {
      state.hasMore = false;
    },
  },
});

export default blogPostsSlice.reducer;
export const {
  setInitial,
  appendBlogPosts,
  removeBlogPost,
  setStatus,
  noMoreData,
} = blogPostsSlice.actions;
