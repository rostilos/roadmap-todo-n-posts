export function fetchPostsReducer(state, postsCollection) {
  return {
    ...state,
    posts: postsCollection,
  };
}

export function fetchRecentPostsReducer(state, postsCollection) {
  return {
    ...state,
    recentPosts: postsCollection,
  };
}
