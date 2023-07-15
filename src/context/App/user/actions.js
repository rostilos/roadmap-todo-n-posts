import { ajaxLoginRequest, registerRequest, updateUserRequest, updateUserPasswordRequest } from "../../../api";
import jwt from "jwt-decode";
import initialState from "../initialState";

import { UPDATE_USER_DATA, UPDATE_USER_LOGGEDIN_STATUS } from "./types";

import LocalStorage from "../../../utils/localStorage";
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
    const { status, userToken } = response;

    if (userToken && status) {
      LocalStorage.saveUserToken(userToken);
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
    const { status, userToken } = response;
    if (userToken && status) {
      LocalStorage.saveUserToken(userToken);
      setLoggedInStatusAction(dispatch, true);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
  return false;
}

export async function updateUserAction(dispatch, userData) {
  try {
    const response = await updateUserRequest(dispatch, userData);
    const { status, userToken } = response;

    if (userToken && status) {
      LocalStorage.saveUserToken(userToken);
      setCustomerDataFromTokenAction(dispatch);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
  return false;
}

export async function updateUserPasswordAction(dispatch, passwordData) {
  try {
    const response = await updateUserPasswordRequest(dispatch, passwordData);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
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
