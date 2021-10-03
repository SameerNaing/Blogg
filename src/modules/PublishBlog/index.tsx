import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EditorState, convertToRaw } from "draft-js";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

import { Status } from "@/common/constants/status";
import { RootState } from "src/store";
import {
  setDialog,
  setInitial,
} from "@/modules/PublishBlog/reducer/publishBlog-slice";
import publishBlogAction from "@/modules/PublishBlog/reducer/publishBlog-action";
import BlogEditor from "@/common/components/BlogEditor";
import PublishDialog from "@/modules/PublishBlog/components/PublishDialog";

function PublishBlog() {
  /** chakra ui toast */
  const toast = useToast();

  /** next js router */
  const router = useRouter();

  /** redux dispatch */
  const dispatch = useDispatch();

  /** redux states */
  const states = useSelector((state: RootState) => state.publishBlog);
  const { dialog, status } = states;

  /** Rich text editor state */
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  /** execute when user click on "ok" button */
  const onPublish = (title: string, image: File) => {
    if (status !== Status.Loading) {
      dispatch(
        publishBlogAction(
          title,
          image,
          JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        )
      );
    }
  };

  /** Function to handler blog publish modal */
  const closeModalHandler = () => {
    if (status !== Status.Loaded && status !== Status.Loading) {
      dispatch(setDialog(false));
    }
  };

  /** track blog post upload status */
  useEffect(() => {
    /** when upload status is error show toast */
    if (status === Status.Error) {
      /** close previous toast */
      toast.closeAll();
      /** show new toast */
      toast({
        title: "Something went wrong",
        description: "Unable to post blog",
        duration: 3000,
        status: "error",
      });
    }
    /** when upload status is done redirect to myblogs page */
    if (status === Status.Loaded) {
      router.replace("/myblogs");
    }
  }, [status]);

  /** set redux states to initial when user leave the page */
  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <>
      <BlogEditor
        readonly={false}
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
      <PublishDialog
        isLoading={status === Status.Loading || status === Status.Loaded}
        isOpen={dialog}
        onClose={closeModalHandler}
        onPublish={onPublish}
      />
    </>
  );
}

export default PublishBlog;
