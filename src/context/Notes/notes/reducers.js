export function setUserLoggedInStatusReducer(state, status) {
  return {
    ...state,
    isLoggedIn: status,
  };
}
export function setCustomerDataReducer(state, userData) {
  return {
    ...state,
    userData: userData,
  };
}
