import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { EditorState, convertFromRaw } from "draft-js";
import {
  VStack,
  HStack,
  Avatar,
  Text,
  Icon,
  Center,
  Spinner,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import numeral from "numeral";
import { useDisclosure } from "@chakra-ui/hooks";

import { RootState } from "src/store";
import { setInitial } from "@/modules/ReadBlog/reducer/readBlog-slice";
import {
  commentAction,
  getBlogAction,
  likeUnlikeAction,
} from "@/modules/ReadBlog/reducer/readBlog-actions";
import CommentsDrawer from "@/modules/ReadBlog/components/CommentsDrawer";
import BlogEditor from "@/common/components/BlogEditor";
import { Status } from "@/common/constants/status";

interface Props {
  blogID: string;
}

const ReadBlog: React.FC<Props> = ({ blogID }) => {
  /** chakra ui toast ui */
  const toast = useToast();

  /** dispatch redux actions */
  const dispatch = useDispatch();

  /** next js router */
  const router = useRouter();

  /** session to track whether user is logged in or not */
  const [session, loading] = useSession();

  /** redux states */
  const states = useSelector((state: RootState) => state.readBlog);
  const { status, commentStatus, blogPost, numLikes, isLike, comments } =
    states;

  /** state to track comments drawer */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /** function to handler when user click on like button */
  const likeUnlikeHandler = () => {
    /** if user is not logged in redirect the user to login page */
    if (!session) {
      router.push("/auth");
    } else {
      dispatch(likeUnlikeAction(blogID, isLike, numLikes));
    }
  };

  /** function to handler when user post a comment */
  const postCommentHandler = (comment: string) => {
    if (commentStatus !== Status.Loading) {
      dispatch(commentAction(comment, blogID));
    }
  };

  /** fetch blog data when page load and clear loaded data when user leaves the page */
  useEffect(() => {
    dispatch(getBlogAction(blogID));
    return () => {
      dispatch(setInitial());
    };
  }, []);

  /** track user comment posting status */
  useEffect(() => {
    /** show toast when error occure on comment posting  */
    if (commentStatus === Status.Error) {
      /** close previous toast */
      toast.closeAll();
      /** show toast */
      toast({
        title: "Something went wrong",
        description: "Unable to post your comment",
        duration: 3000,
        status: "error",
      });
    }
  }, [commentStatus]);

  /** returns loading circle when loading and refetch data button when error occure */
  if (loading || status !== Status.Loaded) {
    return (
      <Center h="100vh">
        {status === Status.Error && (
          <VStack spacing={4}>
            <Text>Sorry, Unable to get Data!</Text>
            <Button
              onClick={() => dispatch(getBlogAction(blogID))}
              borderColor="orange"
              color="orange"
              variant="outline"
            >
              Try Again
            </Button>
          </VStack>
        )}
        {status === Status.Loading && <Spinner color="orange" size="xl" />}
      </Center>
    );
  }

  return (
    <>
      <BlogEditor
        readonly
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(blogPost!.blogData))
        )}
      />
      <HStack
        alignItems="flex-start"
        mb="100px"
        mx="auto"
        width="95%"
        maxW="1200px"
        px="12px"
        spacing={7}
      >
        <Avatar src={blogPost!.userImg} name={blogPost!.username} />
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{blogPost!.username}</Text>
          <HStack spacing={6}>
            <HStack>
              <Icon
                onClick={likeUnlikeHandler}
                cursor="pointer"
                color={isLike ? "orange" : "dark"}
                as={isLike ? AiFillLike : AiOutlineLike}
              />
              <Text cursor="default" fontSize="0.9em">
                {numeral(numLikes).format("Oa")}
              </Text>
            </HStack>
            <Icon
              data-cy="open-comments-drawer-icon"
              onClick={onOpen}
              cursor="pointer"
              w="20px"
              as={FaRegComments}
            />
          </HStack>
        </VStack>
      </HStack>
      <CommentsDrawer
        comments={comments}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={commentStatus === Status.Loading}
        session={session}
        onPostComment={postCommentHandler}
      />
    </>
  );
};

export default ReadBlog;
