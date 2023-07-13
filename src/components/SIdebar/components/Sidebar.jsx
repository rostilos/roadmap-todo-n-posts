import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAppContext from "../../../hook/useAppContext";
import sidebarItems from "../utils/sidebarItems";
import SidebarItem from "./SidebarItem";
import logout from "../../../assets/images/sidebar/logout.svg";
import user from "../../../assets/images/sidebar/user.svg";

const Sidebar = function () {
  const navigate = useNavigate();
  const { isLoggedIn, clearCustomerData } = useAppContext();
  const location = useLocation();

  let filteredSidebarItems;
  const handleClick = (path) => {
    navigate(path);
  };
  if (!isLoggedIn) {
    filteredSidebarItems = sidebarItems.filter((item) => !item.loginRequired);
  } else {
    filteredSidebarItems = sidebarItems;
  }
  const sidebarElements = filteredSidebarItems.map(({ label, icon, path }) => {
    return (
      <SidebarItem
        handleClick={handleClick}
        isActive={location.pathname === path}
        key={label}
        label={label}
        path={path}
        icon={icon}
      />
    );
  });
  return (
    <aside className="page__sidebar sidebar" style={{ padding: 0 }}>
      <div className="_section">
        {!isLoggedIn && (
          <SidebarItem
            label="Login"
            path="/login"
            icon={user}
            handleClick={() => handleClick("/login")}
            isActive={location.pathname === "/login"}
          />
        )}
        {sidebarElements}
        {isLoggedIn && (
          <div className="nav-sidebar__item">
            <button type="button" onClick={clearCustomerData}>
              <img alt="unset" src={logout} className="nav-sidebar__icon" />
              <span className="nav-sidebar__label">Log out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
