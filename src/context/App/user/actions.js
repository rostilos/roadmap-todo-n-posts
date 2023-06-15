import _get from "lodash.get";
import { ajaxLoginRequest, registerRequest } from "../../../api";
import jwt from "jwt-decode";
import initialState from "../initialState";

// import {
//   setErrorMessageAction,
//   setSuccessMessageAction,
// } from '../page/actions';
import {
  //   SET_CUSTOMER_INFO,
  //   UPDATE_CUSTOMER_ADDRESS,
  //   SET_CUSTOMER_ADDRESS_INFO,
  UPDATE_USER_DATA,
  UPDATE_USER_LOGGEDIN_STATUS,
} from "./types";
// import { _cleanObjByKeys } from '../../../utils';
import LocalStorage from "../../../utils/localStorage";
import { config } from "../../../config";
import { isEmpty } from "lodash";

export function setLoggedInStatusAction(dispatch, status) {
  dispatch({
    type: UPDATE_USER_LOGGEDIN_STATUS,
    payload: !!status,
  });
}
export async function ajaxLoginAction(dispatch, userCredentials) {
  try {
    const response = await ajaxLoginRequest(dispatch, userCredentials);
    const { errors, status } = response;

    if (!errors && status) {
      const signInToken = status;
      LocalStorage.saveUserToken(signInToken);
    }
    setLoggedInStatusAction(dispatch, !!status);

    return response;
  } catch (error) {
    console.error(error);
  }

  return {};
}

export async function registerAction(dispatch, userData) {
  try {
    const response = await registerRequest(dispatch, userData);
    const { errors, status } = response;

    if (!errors && status) {
      const signInToken = status;
      // LocalStorage.saveUserToken(signInToken);
      if (typeof window !== "undefined") {
        // window.location.reload();
      }
    }
    // setLoggedInStatusAction(dispatch, !!status);

    // return false;
  } catch (error) {
    console.error(error);
  }

  return {};
}

export function setCustomerDataFromTokenAction(dispatch) {
  const userToken = LocalStorage.getUserToken();
  if (userToken && !isEmpty(userToken)) {
    const userData = jwt(userToken);
    const { firstname, lastname, birth_date, email } = userData?.user;
    dispatch({
      type: UPDATE_USER_DATA,
      payload: { firstname, lastname, birth_date, email },
    });
  }
}

export function clearCustomerDataAction(dispatch) {
  const initialData = initialState.userData;
  LocalStorage.removeUserDataFromStorage();
  dispatch({
    type: UPDATE_USER_DATA,
    payload: initialData,
  });
  window.location.reload();
}
