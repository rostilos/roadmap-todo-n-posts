import React, { useMemo, useReducer } from "react";
import { node } from "prop-types";

import postsReducer from "./postsReducer";
import PostsDataContext from "./PostsDataContext";
import postsDispatcher from "./postsDispatcher";
import initialState from "./initialState";

function PostsDataProvider({ children }) {
  const [postsData, dispatch] = useReducer(postsReducer, initialState);
  const postsActions = useMemo(() => postsDispatcher(dispatch), [dispatch]);

  return (
    <PostsDataContext.Provider value={[postsData, postsActions]}>{children}</PostsDataContext.Provider>
  );
}

PostsDataProvider.propTypes = {
  children: node.isRequired,
};

export default PostsDataProvider;
