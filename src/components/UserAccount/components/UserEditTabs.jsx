import React from "react";

const UserEditTabs = function ({ handleTabChange, activeTab, children }) {
  return (
    <div className="_section">
      <div className="user-page__tabs _tabs ">
        <button
          type="button"
          onClick={() => handleTabChange(0)}
          className={`_tabs__item  ${activeTab === 0 ? "_tabs__item--active" : ""}`}
        >
          Edit Information
        </button>
        <button
          type="button"
          onClick={() => handleTabChange(1)}
          className={`_tabs__item  ${activeTab === 1 ? "_tabs__item--active" : ""}`}
        >
          Change Password
        </button>
      </div>
      
      {children}
    </div>
  );
};

export default UserEditTabs;
