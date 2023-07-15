import { isEmpty } from "lodash";

const LocalStorage = {
  getUserToken() {
    const userToken = window.localStorage.getItem("token") || null;
    return userToken;
  },
  saveUserToken(data) {
    window.localStorage.setItem("token", data);
  },
  removeUserDataFromStorage(){
    window.localStorage.removeItem("token");
  }
};

export default LocalStorage;
