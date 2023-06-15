import React from "react";
import useAppContext from "../../../hook/useAppContext";
import LocalStorage from "../../../utils/localStorage";

const LogInOutButton = function () {
  const { isLoggedIn, clearCustomerData } = useAppContext();
  return (
    <div>
      {isLoggedIn && (
        <div>
          <button className="_link header__login-button" type="button" onClick={clearCustomerData}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default LogInOutButton;
