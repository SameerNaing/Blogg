import { useRouter } from "next/router";

import ReadBlog from "@/modules/ReadBlog";
import NavigationBar from "@/modules/Navbar";
import Header from "@/common/components/Header";

function Blog() {
  const router = useRouter();
  const { blogID = null } = router.query;

  return (
    <>
      <Header title="Read Blog" />
      <NavigationBar />

      {blogID && <ReadBlog blogID={blogID as string} />}
    </>
  );
}

export default Blog;
