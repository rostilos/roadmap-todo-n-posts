import { fetchAllUsersRequest } from "../../../api";

import { UPDATE_USERS_LIST } from "./types";
import { isEmpty } from "lodash";

export async function fetchUsersAction(dispatch) {
  try {
    const response = await fetchAllUsersRequest(dispatch);
    console.log(response);
    if (!isEmpty(response)) {
      dispatch({
        type: UPDATE_USERS_LIST,
        payload: response,
      });
    } else {
      dispatch({
        type: UPDATE_USERS_LIST,
        payload: {},
      });
    }
  } catch (error) {
    console.error(error);
  }
}