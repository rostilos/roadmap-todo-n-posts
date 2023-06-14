import { isEmpty } from "lodash";

const LocalStorage = {
  getUserToken() {
    return !isEmpty(JSON.parse(window.localStorage.getItem("token") || {}));
  },
  saveUserToken(data) {
    window.localStorage.setItem("token", JSON.stringify(data));
  },
};

export default LocalStorage;
