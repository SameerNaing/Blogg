import type { NextPage, GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import NavigationBar from "@/modules/Navbar";
import Header from "@/common/components/Header";
import BlogPosts from "@/modules/BlogPosts";
import { NewSession } from "src/common/types/sessionType";
import getBlogPosts from "@/dbFunctions/getBlogPosts";
import fakeBlogPostData from "mocks/data/blogPosts";

interface Props {
  blogPosts: DisplayBlog[];
  userID: string | null;
}

/** Home Page */
const Home: NextPage<Props> = ({ blogPosts, userID }) => {
  return (
    <>
      <Header title="Home" />
      <NavigationBar />
      <BlogPosts
        userID={userID}
        avoid={true}
        preRenderedBlogs={blogPosts}
        marginTop="80px"
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as NewSession;

  /** in development send mock fake data */
  if (process.env.NODE_ENV === "development") {
    return {
      props: {
        blogPosts: fakeBlogPostData.slice(0, 5),
        userID: session ? session.user.userID : null,
      },
    };
  }

  let blogPosts = [];

  if (session) {
    blogPosts = await getBlogPosts(session.user.userID, true);
  } else {
    blogPosts = await getBlogPosts();
  }

  return {
    props: {
      blogPosts,
      userID: session ? session.user.userID : null,
    },
  };
};
