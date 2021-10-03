import axios from "axios";

/** fetch Blog post data */
async function getBlogPost(blogID: string) {
  const response = await axios.get(`/api/blogPosts/${blogID}`);
  return response.data;
}

//** post comment */
async function commentBlogPost(comment: string, blogID: string) {
  const response = await axios.post("/api/blogPosts/comment", {
    blogID,
    userComment: comment,
  });
  return response.data;
}

/** like or unlike post */
async function likeUnlikeBlogPost(blogID: string, isLike: boolean) {
  await axios.post("/api/blogPosts/likeUnlike", { blogID, isLike });
}

export { getBlogPost, commentBlogPost, likeUnlikeBlogPost };
