import { UPDATE_POSTS_LIST } from "./posts/types";
import { fetchPostsReducer } from "./posts/reducers";

const actions = {
  [UPDATE_POSTS_LIST]: fetchPostsReducer,
};

export default function postsReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
