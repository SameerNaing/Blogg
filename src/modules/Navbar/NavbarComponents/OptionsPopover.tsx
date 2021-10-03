import Link from "next/link";
import {
  Box,
  Avatar,
  Heading,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

interface Props {
  /** Profile image to show as avatar in popover header */
  image: string;
  /** User name to show in popover header */
  name: string;
  /** Function to execute when user press logout */
  onSignout(): void;
}

/** Gives popover when user click on profile pic avatar on navbar  */
const OptionsPopover: React.FC<Props> = ({
  children,
  image,
  name,
  onSignout,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>
      <PopoverContent data-cy="popover" maxW="210px" right={2} shadow="lg">
        <PopoverArrow />
        <PopoverHeader>
          <HStack>
            <Avatar name={name} src={image} />
            <Heading
              wordBreak="break-word"
              as="span"
              fontWeight="normal"
              color="grey"
              size="xs"
            >
              {name}
            </Heading>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <VStack mt="12px" spacing={6} alignItems="self-start">
            <Link href="/new-blog">
              <a>Write Blog</a>
            </Link>
            <Link href="/myblogs">
              <a>My Blogs</a>
            </Link>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onSignout();
                }}
                style={{ color: "red" }}
              >
                Log out
              </a>
            </Link>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default OptionsPopover;
