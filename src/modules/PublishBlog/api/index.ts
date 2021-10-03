import axios from "axios";

/** api request to publish blog */
async function publishBlog(
  title: string,
  displayImgUrl: string,
  blogData: string,
  imageStorageRef: string
) {
  await axios.post("/api/blogPosts/publishBlog", {
    title,
    displayImgUrl,
    blogData,
    imageStorageRef,
  });
}

export default publishBlog;
