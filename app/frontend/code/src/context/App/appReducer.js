import { UPDATE_USER_LOGGEDIN_STATUS, UPDATE_USER_DATA } from "./user/types";
import { setUserLoggedInStatusReducer, setCustomerDataReducer } from "./user/reducers";

import { setPageLoader, setPageMessage } from "./page/reducers";
import { SET_PAGE_LOADER, SET_PAGE_MESSAGE } from "./page/types";

const actions = {
  [UPDATE_USER_LOGGEDIN_STATUS]: setUserLoggedInStatusReducer,
  [UPDATE_USER_DATA]: setCustomerDataReducer,
  [SET_PAGE_LOADER]: setPageLoader,
  [SET_PAGE_MESSAGE]: setPageMessage,
};

export default function appReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
