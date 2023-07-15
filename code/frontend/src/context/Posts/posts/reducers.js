export function fetchPostsReducer(state, postsCollection) {
  return {
    ...state,
    posts: postsCollection,
  };
}
