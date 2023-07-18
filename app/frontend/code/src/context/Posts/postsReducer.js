import { UPDATE_POSTS_LIST, UPDATE_RECENT_POSTS } from "./posts/types";
import { fetchPostsReducer, fetchRecentPostsReducer } from "./posts/reducers";

const actions = {
  [UPDATE_POSTS_LIST]: fetchPostsReducer,
  [UPDATE_RECENT_POSTS]: fetchRecentPostsReducer,
};

export default function postsReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
