import { useContext } from "react";

import PostsDataContext from "../context/Posts/PostsDataContext";

export default function usePostsContext() {
  const [postsData, postsActions] = useContext(PostsDataContext);
  const { dispatch: postsDispatch } = postsActions;
  return {
    ...postsData,
    ...postsActions,
    postsDispatch,
  };
}
