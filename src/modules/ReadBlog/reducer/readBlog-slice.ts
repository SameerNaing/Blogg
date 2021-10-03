import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/common/constants/status";

interface ReadBlogState {
  status: Status;
  commentStatus: Status;
  blogPost: ReadBlogPostModel | null;
  numLikes: number;
  isLike: boolean;
  comments: CommentModel[];
}

const initialState: ReadBlogState = {
  status: Status.Loading,
  commentStatus: Status.Initial,
  blogPost: null,
  numLikes: 0,
  isLike: false,
  comments: [],
};

const readBlogSlice = createSlice({
  name: "readBlog",
  initialState,
  reducers: {
    /** set status to initial when user leaves the page */
    setInitial: (state) => (state = initialState),

    /** page status */
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },

    /** load blog post data */
    setBlogPost: (state, action: PayloadAction<ReadBlogPostModel>) => {
      state.blogPost = action.payload;
    },

    /** load number of likes  */
    setNumLikes: (state, action: PayloadAction<number>) => {
      state.numLikes = action.payload;
    },

    /** track whether user has already like the blog post or not*/
    setIsLike: (state, action: PayloadAction<boolean>) => {
      state.isLike = action.payload;
    },

    /** load users comments for the blog post */
    setComments: (state, action: PayloadAction<CommentModel[]>) => {
      state.comments = action.payload;
    },

    /** track user's comment posting status */
    setCommentStatus: (state, action: PayloadAction<Status>) => {
      state.commentStatus = action.payload;
    },

    /** append user's comment to an existing comments list */
    addComment: (state, action: PayloadAction<CommentModel>) => {
      state.comments.unshift(action.payload);
    },
  },
});

export default readBlogSlice.reducer;
export const {
  setInitial,
  setStatus,
  setBlogPost,
  setNumLikes,
  setIsLike,
  setComments,
  setCommentStatus,
  addComment,
} = readBlogSlice.actions;
