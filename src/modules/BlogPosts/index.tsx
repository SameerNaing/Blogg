import { useEffect } from "react";
import { Grid, Spinner, Center, Text, Button, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/store";
import { Status } from "@/common/constants/status";
import { setInitial } from "@/modules/BlogPosts/reducer/blogPosts-slice";
import { fetchBlogAction, deleteBlogAction } from "./reducer/blogPosts-action";
import usePagination from "@/common/hooks/paginationHook";

import BlogPostCard from "@/modules/BlogPosts/components/BlogPostCard";

interface Props {
  /** Pre-rendered Data from Server */
  preRenderedBlogs?: DisplayBlog[];
  /** User ID */
  userID?: string | null;
  /** avoid all blog posts from given userID */
  avoid?: boolean | null;
  /** Top margin */
  marginTop: string;
  /** Fetch from page 2 */
  excludePageOne?: boolean;
  /** Show user pic and name in blog post card */
  showUser?: boolean;
  /** Show delete button */
  showDelete?: boolean;
}

const BlogPosts: React.FC<Props> = ({
  preRenderedBlogs = [],
  userID = null,
  avoid = null,
  marginTop,
  excludePageOne = true,
  showUser = true,
  showDelete = false,
}) => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.blogPosts);
  const { paginatedBlogPosts, status, hasMore } = states;

  const { ref, pageNumber } = usePagination<HTMLDivElement>(hasMore, status);

  const refetch = () =>
    dispatch(
      fetchBlogAction(
        userID,
        avoid,
        preRenderedBlogs[preRenderedBlogs.length - 1] || null,
        paginatedBlogPosts[paginatedBlogPosts.length - 1] || null
      )
    );

  useEffect(() => {
    if (excludePageOne && pageNumber === 1) {
      return;
    } else {
      dispatch(
        fetchBlogAction(
          userID,
          avoid,
          preRenderedBlogs[preRenderedBlogs.length - 1] || null,
          paginatedBlogPosts[paginatedBlogPosts.length - 1] || null
        )
      );
    }
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <>
      <Grid
        mt={marginTop}
        mb="30px"
        width="96%"
        maxW="2500px"
        mx="auto"
        templateColumns={[
          "1fr",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        columnGap={8}
        rowGap={10}
      >
        {preRenderedBlogs.map((b) => (
          <BlogPostCard
            key={b.id}
            blogID={b.id}
            title={b.title}
            blogImg={b.image}
            date={b.date}
            userImg={showUser ? b.userImg : null}
            userName={showUser ? b.userName : null}
          />
        ))}
        {paginatedBlogPosts.map((b) => (
          <BlogPostCard
            key={b.id}
            blogID={b.id}
            title={b.title}
            blogImg={b.image}
            date={b.date}
            userImg={showUser ? b.userImg : null}
            userName={showUser ? b.userName : null}
            showDelete={showDelete}
            onDelete={() => dispatch(deleteBlogAction(b.id))}
          />
        ))}
      </Grid>
      <div ref={ref}></div>
      <Center mb="20px">
        {status === Status.Loading && (
          <Spinner data-cy="paginate-blogs-loading-spinner" color="orange" />
        )}
        {status === Status.Error && (
          <VStack data-cy="paginate-error">
            <Text color="dark">Unable to get Data!</Text>
            <Button
              data-cy="refetch-paginate-blogs-button"
              onClick={refetch}
              size="sm"
              variant="outline"
              colorScheme="red"
            >
              Try Again
            </Button>
          </VStack>
        )}
      </Center>
    </>
  );
};

export default BlogPosts;
