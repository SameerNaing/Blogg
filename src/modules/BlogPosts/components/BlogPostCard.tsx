import {
  LinkBox,
  AspectRatio,
  LinkOverlay,
  HStack,
  Image,
  Box,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface Props {
  blogID: string;
  /** Blog Post title */
  title: string;
  /** Blog Posted Date */
  date: string;
  /** Blog Post Display Image */
  blogImg: string;
  /**  Posted Blog's username */
  userName?: string | null;
  /** Posted Blog's user image */
  userImg?: string | null;
  /** show Delete Button */
  showDelete?: boolean;
  /** On Delete Button Clicked */
  onDelete?(): void;
}

/** Design for displaying blog post */
const BlogPostCard: React.FC<Props> = ({
  blogID,
  title,
  date,
  blogImg,
  userName = null,
  userImg = null,
  showDelete = false,
  onDelete = () => {},
}) => {
  return (
    <Box
      role="group"
      borderRadius="30px"
      borderColor="cardBorder"
      borderWidth="1px"
      borderStyle="solid"
      cursor="pointer"
      bg="white"
      _hover={{ bg: "orange", shadow: "lg" }}
    >
      <AspectRatio ratio={1.5}>
        <Link href={`/blogPosts/${blogID}`} passHref>
          <Image fit="cover" borderTopRadius="30px" src={blogImg} />
        </Link>
      </AspectRatio>

      <Box spacing="12px" py="25px" px="12px">
        <LinkBox>
          <Link href={`/blogPosts/${blogID}`} passHref>
            <LinkOverlay>
              <Heading
                lineHeight="1.5"
                fontSize="1.05rem"
                _groupHover={{ color: "white" }}
              >
                {title}
              </Heading>
            </LinkOverlay>
          </Link>
          {userName && userImg && (
            <HStack mt="30px">
              <Avatar size="sm" src={userImg} />
              <Text
                fontSize="0.8em"
                fontWeight="500"
                _groupHover={{ color: "white" }}
              >
                {userName}
              </Text>
            </HStack>
          )}
        </LinkBox>

        <HStack justifyContent={showDelete ? "space-between" : "flex-end"}>
          <Text
            mt="20px"
            color="grey"
            opacity="0.7"
            fontSize="0.8em"
            _groupHover={{ color: "whiteDim" }}
          >
            {date}
          </Text>
          {showDelete && (
            <DeleteIcon
              onClick={onDelete}
              w={4}
              h={4}
              color="red"
              _groupHover={{ color: "white" }}
            />
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default BlogPostCard;
