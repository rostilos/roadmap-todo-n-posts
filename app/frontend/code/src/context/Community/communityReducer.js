import { UPDATE_USERS_LIST } from "./community/types";
import { fetchUsersReducer } from "./community/reducers";

const actions = {
  [UPDATE_USERS_LIST]: fetchUsersReducer,
};

export default function communityReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
