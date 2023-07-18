import { createPostAction, fetchPostsAction, fetchPostViewAction, fetchRecentPostsAction } from "./posts/actions";

const dispatchMapper = {
  createPost: createPostAction,
  fetchPosts: fetchPostsAction,
  fetchPostView: fetchPostViewAction,
  fetchRecentPosts: fetchRecentPostsAction,
};

export default function postsDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
