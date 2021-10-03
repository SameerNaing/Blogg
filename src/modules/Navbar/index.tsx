import Link from "next/link";
import {
  Image,
  HStack,
  SkeletonCircle,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { SearchIcon } from "@chakra-ui/icons";

import { useSession, signOut } from "next-auth/client";

import ProfileImg from "./NavbarComponents/ProfileImg";
import LoginContainer from "./NavbarComponents/LoginContainer";
import OptionsPopover from "./NavbarComponents/OptionsPopover";
import SearchModal from "./NavbarComponents/SearchModal";

interface Props {
  /** to show publish button or not */
  showPublishBtn?: boolean;
  /** Function to execute when user click on publish button */
  onPublishBtnClick?(): void;
}

/** Gives Nav bar */
const NavigationBar: React.FC<Props> = ({
  showPublishBtn = false,
  onPublishBtnClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [session, loading] = useSession();

  return (
    <>
      <Box
        boxShadow="sm"
        bg="white"
        px={["10px", "30px"]}
        w="100vw"
        h="60px"
        position="fixed"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        zIndex={2}
        top={0}
      >
        <Link href="/">
          <a>
            <Image
              boxSize={["35px", "40px"]}
              src="/appLogo.png"
              alt="appLogo"
            />
          </a>
        </Link>
        <HStack spacing="30px">
          {showPublishBtn && (
            <Button
              onClick={onPublishBtnClick}
              borderRadius="30px"
              colorScheme="none"
              bg="orange"
              color="white"
              size="sm"
            >
              Publish
            </Button>
          )}
          <SearchIcon
            data-cy="navbar-search-icon"
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />

          {loading && !showPublishBtn && <SkeletonCircle />}

          {!loading && session && !showPublishBtn && (
            <OptionsPopover
              onSignout={signOut}
              image={session.user!.image!}
              name={session.user!.name!}
            >
              <ProfileImg
                name={session.user!.name!}
                src={session.user!.image!}
              />
            </OptionsPopover>
          )}

          {!loading && !session && <LoginContainer />}
        </HStack>
      </Box>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NavigationBar;
