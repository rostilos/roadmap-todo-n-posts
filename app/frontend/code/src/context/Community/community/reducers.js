export function fetchUsersReducer(state, usersCollection) {
  return {
    ...state,
    users: usersCollection,
  };
}
