import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "@/common/constants/status";

interface PublishBlogState {
  dialog: boolean;
  status: Status;
}

const initialState: PublishBlogState = {
  dialog: false,
  status: Status.Initial,
};

const publishBlogSlice = createSlice({
  name: "publishBlog",
  initialState,
  reducers: {
    /** set states to initial when user left page */
    setInitial: (state) => (state = initialState),

    /** to open or close publish modal */
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload;
    },

    /** blog post uploaing status */
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setInitial, setDialog, setStatus } = publishBlogSlice.actions;
export default publishBlogSlice.reducer;
