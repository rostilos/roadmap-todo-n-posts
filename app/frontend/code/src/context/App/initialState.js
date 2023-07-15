import LocalStorage from "../../utils/localStorage";

const initialState = {
  isLoggedIn: !!LocalStorage.getUserToken(),
  userData: {
    firstname: null,
    lastname: null,
    birth_date: null,
    email: null,
  },
};

export default initialState;
