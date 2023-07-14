import React from "react";

const LoginTabs = function ({ changeHandler, activeTab }) {
  return (
    <div className="login-page__tabs login-tabs">
      <button
        type="button"
        onClick={() => changeHandler(0)}
        className={`login-tabs__item ${activeTab === 0 ? "login-tabs__item--active" : ""}`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => changeHandler(1)}
        className={`login-tabs__item ${activeTab === 1 ? "login-tabs__item--active" : ""}`}
      >
        Register
      </button>
    </div>
  );
};

export default LoginTabs;
