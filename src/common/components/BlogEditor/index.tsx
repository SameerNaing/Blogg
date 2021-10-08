import dynamic from "next/dynamic";
import { EditorState, convertFromRaw } from "draft-js";
import { Center, Box } from "@chakra-ui/layout";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  async () => {
    const module = await import("react-draft-wysiwyg");
    return module.Editor;
  },
  { ssr: false }
);

interface Props {
  /** editor to display on data */
  readonly: boolean;
  /** editor content */
  editorState: EditorState | undefined;
  /** function to handler when user type in the editor */
  onEditorStateChange?(editorState: EditorState): void;
}

/** Gives Rich text editor */
const BlogEditor: React.FC<Props> = ({
  readonly,
  editorState,
  onEditorStateChange = () => {},
}) => {
  return (
    <Center>
      <Box
        w="95%"
        maxW="1200px"
        mt="80px"
        mb="50px"
        p="12px"
        shadow={readonly ? "none" : "lg"}
      >
        <Editor
          readOnly={readonly}
          toolbarHidden={readonly}
          editorStyle={{ marginTop: readonly ? 0 : "none" }}
          editorClassName="editor"
          toolbarStyle={{
            position: "fixed",
            top: "70px",
            zIndex: 2,
            backgroundColor: "white",
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Box>
    </Center>
  );
};

export default BlogEditor;
