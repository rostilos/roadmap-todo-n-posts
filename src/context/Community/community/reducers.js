export function fetchUsersReducer(state, users) {
  return {
    ...state,
    users: users,
  };
}
