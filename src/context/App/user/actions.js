import _get from "lodash.get";
import { ajaxLoginRequest, registerRequest } from "../../../api";

// import {
//   setErrorMessageAction,
//   setSuccessMessageAction,
// } from '../page/actions';
import {
  //   SET_CUSTOMER_INFO,
  //   UPDATE_CUSTOMER_ADDRESS,
  //   SET_CUSTOMER_ADDRESS_INFO,
  UPDATE_USER_LOGGEDIN_STATUS,
} from "./types";
// import { _cleanObjByKeys } from '../../../utils';
import LocalStorage from "../../../utils/localStorage";
import { config } from "../../../config";

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
      if (typeof window !== "undefined") {
        // window.location.reload();
      }
    }
    setLoggedInStatusAction(dispatch, !!status);

    return response;
    // return false;
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


// export async function sigInCustomerAction(dispatch, userCredentials) {
//   try {
//     const { token } = await generateCustomerToken(dispatch, userCredentials);
//     LocalStorage.saveCustomerToken(token);
//     setLoggedInStatusAction(dispatch, true);
//     setSuccessMessageAction(dispatch, "You are successfully logged-in");

//     return true;
//   } catch (error) {
//     console.error(error);
//     setErrorMessageAction(dispatch, _get(error, "message") || "Something went wrong with sign-in. Please try later");
//   }

//   return false;
// }

