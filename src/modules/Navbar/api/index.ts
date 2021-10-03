import axios from "axios";

/** Fetch searched blog post data
 * @param keyword - blog title you want to search
 */
async function search(keyword: string) {
  try {
    const response = await axios.get("/api/blogPosts/search", {
      params: { keyword },
    });
    return response.data as SearchResult[];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default search;
