import { UPDATE_USER_LOGGEDIN_STATUS } from "./user/types";
import { setUserLoggedInStatusReducer } from "./user/reducers";

import { setPageLoader, setPageMessage } from './page/reducers';
import { SET_PAGE_LOADER, SET_PAGE_MESSAGE } from './page/types';

const actions = {
  [UPDATE_USER_LOGGEDIN_STATUS]: setUserLoggedInStatusReducer,
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
