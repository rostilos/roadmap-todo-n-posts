
import { setMessageAction, setPageLoaderAction, setErrorMessageAction, setSuccessMessageAction } from "./notes/actions";
const dispatchMapper = {
  setMessage: setMessageAction,
  setPageLoader: setPageLoaderAction,
  setErrorMessage: setErrorMessageAction,
  setSuccessMessage: setSuccessMessageAction,
};

export default function notesDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
