import axios from "axios";

/** Fetch Paginate Blog Posts */
async function fetchPaginatedBlog(
  userID: string | null = null,
  avoid: boolean | null = null,
  lastID: string | null
) {
  const response = await axios.get("/api/blogPosts", {
    params: { userID, avoid, lastID },
  });
  return response.data;
}

/** Delete Blog Post */
async function deleteBlog(blogID: string) {
  const response = await axios.delete("/api/blogPosts/delete", {
    params: { blogID },
  });
  return response.data;
}

export { fetchPaginatedBlog, deleteBlog };
