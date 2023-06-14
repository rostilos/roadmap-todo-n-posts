const LocalStorage = {
  getUserToken() {
    return JSON.parse(
      window.localStorage.getItem('token') || '{}'
    );
  },
};

export default LocalStorage;
