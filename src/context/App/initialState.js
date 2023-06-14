import LocalStorage from "../../utils/localStorage";

const initialState = {
    isLoggedIn: !!LocalStorage.getUserToken(),
};

export default initialState;
