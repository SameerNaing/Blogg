import { Heading } from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import type { GetServerSideProps, NextPage } from "next";

import NavigationBar from "@/modules/Navbar";
import Header from "@/common/components/Header";
import BlogPosts from "@/modules/BlogPosts";
import { NewSession } from "src/common/types/sessionType";

interface Props {
  userID: string;
}

/** My Blogs display page */
const MyBlogs: NextPage<Props> = ({ userID }) => {
  return (
    <>
      <Header title="My Blogs" />
      <NavigationBar />
      <Heading mt="80px" ml="35px" fontSize="1.6em">
        My Blogs
      </Heading>
      <BlogPosts
        userID={userID}
        avoid={false}
        excludePageOne={false}
        marginTop="30px"
        showUser={false}
        showDelete
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = (await getSession(context)) as NewSession;
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userID: session.user.userID,
    },
  };
};

export default MyBlogs;
