import { configureStore } from "@reduxjs/toolkit";

import blogPostsReducer from "@/modules/BlogPosts/reducer/blogPosts-slice";
import blogPublishReducer from "@/modules/PublishBlog/reducer/publishBlog-slice";
import readBlogReducer from "@/modules/ReadBlog/reducer/readBlog-slice";

export const store = configureStore({
  reducer: {
    blogPosts: blogPostsReducer,
    publishBlog: blogPublishReducer,
    readBlog: readBlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
