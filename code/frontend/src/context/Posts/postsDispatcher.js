import { createPostAction, fetchPostsAction, fetchPostViewAction } from "./posts/actions";

const dispatchMapper = {
  createPost: createPostAction,
  fetchPosts: fetchPostsAction,
  fetchPostView: fetchPostViewAction,
};

export default function postsDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
