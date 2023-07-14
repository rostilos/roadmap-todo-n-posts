import { fetchUsersAction } from "./community/actions";

const dispatchMapper = {
  fetchUsers: fetchUsersAction,
};

export default function communityDispatcherDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
