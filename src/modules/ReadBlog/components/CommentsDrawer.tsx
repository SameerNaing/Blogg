import React, { useState } from "react";
import {
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Textarea,
  Button,
  Box,
  Heading,
  Divider,
  VStack,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";

import type { Session } from "next-auth";

interface Props {
  /** users comments to display  */
  comments: CommentModel[];
  /** track drawer open,close state */
  isOpen: boolean;
  /** session to track whether user login or not */
  session: Session | null;
  /** comment posting status */
  isLoading: boolean;
  /** function to close drawer */
  onClose(): void;
  /** function to execute when user post comment */
  onPostComment(comment: string): void;
}

/** Gives design for comments drawer */
const CommentsDrawer: React.FC<Props> = ({
  comments,
  isOpen,
  session,
  isLoading,
  onClose,
  onPostComment,
}) => {
  /** state to track user enter comment text */
  const [comment, setComment] = useState<string>("");

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent data-cy="comments-drawer">
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading fontSize="1.2em">Comments</Heading>
        </DrawerHeader>
        <DrawerBody>
          {/* show comment input field only when user is login */}
          {session && (
            <>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isLoading}
                resize="none"
                placeholder="Write your comment..."
              />
              <Box mt="12px" display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => onPostComment(comment)}
                  disabled={comment.trim().length === 0}
                  isLoading={isLoading}
                  bg="orange"
                  color="white"
                  size="sm"
                  colorScheme="none"
                >
                  OK
                </Button>
              </Box>
              <Divider mt="30px" />
            </>
          )}
          {comments.map((c) => (
            <React.Fragment key={c.commentID}>
              <VStack spacing={4} my="20px" alignItems="flex-start">
                <HStack>
                  <Avatar size="sm" src={c.userImg} />
                  <Text fontSize="0.8em">{c.username}</Text>
                </HStack>
                <Text fontSize="0.9em">{c.comment}</Text>
              </VStack>
              <Divider />
            </React.Fragment>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentsDrawer;
