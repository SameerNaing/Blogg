import { useDispatch } from "react-redux";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

import { setDialog } from "@/modules/PublishBlog/reducer/publishBlog-slice";
import NavigationBar from "@/modules/Navbar";
import Header from "@/common/components/Header";
import PublishBlog from "@/modules/PublishBlog";
import { NewSession } from "src/common/types/sessionType";

/** Publish new blog page */
function NewBlog() {
  const dispatch = useDispatch();
  return (
    <>
      <Header title="Publish Blog" />
      <NavigationBar
        showPublishBtn
        onPublishBtnClick={() => dispatch(setDialog(true))}
      />
      <PublishBlog />
    </>
  );
}

export default NewBlog;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    props: {},
  };
};
