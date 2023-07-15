import {
  setLoggedInStatusAction,
  ajaxLoginAction,
  registerAction,
  setCustomerDataFromTokenAction,
  clearCustomerDataAction,
  updateUserAction,
  updateUserPasswordAction,
} from "./user/actions";
import { setMessageAction, setPageLoaderAction, setErrorMessageAction, setSuccessMessageAction } from "./page/actions";
const dispatchMapper = {
  setLoggedInStatus: setLoggedInStatusAction,
  ajaxLogin: ajaxLoginAction,
  setMessage: setMessageAction,
  setPageLoader: setPageLoaderAction,
  setErrorMessage: setErrorMessageAction,
  setSuccessMessage: setSuccessMessageAction,
  register: registerAction,
  setCustomerDataFromToken: setCustomerDataFromTokenAction,
  clearCustomerData: clearCustomerDataAction,
  updateUser: updateUserAction,
  updateUserPassword: updateUserPasswordAction,
};

export default function appDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
