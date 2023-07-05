import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../../hook/useAppContext";
import sidebarItems from "../utils/sidebarItems";
import SidebarItem from "./SidebarItem";

const Sidebar = function () {
  const navigate = useNavigate();
  const { isLoggedIn, clearCustomerData } = useAppContext();

  let filteredSidebarItems;
  const handleClick = (path) => {
    navigate(path);
  };
  if (!isLoggedIn) {
    filteredSidebarItems = sidebarItems.filter((item) => !item.loginRequired);
  } else {
    filteredSidebarItems = sidebarItems;
  }
  const isActive = false;
  const sidebarElements = filteredSidebarItems.map(({ label, icon, path }) => {
    return <SidebarItem handleClick={handleClick} key={label} label={label} path={path} icon={icon} isActive={isActive} />;
  });
  return (
    <aside className="page__sidebar sidebar _section">
      {sidebarElements}
      {isLoggedIn && (
        <div className="nav-sidebar__item">
          <button type="button" onClick={clearCustomerData}>
            <img alt="unset" className="nav-sidebar__icon" />
            <span className="nav-sidebar__label">Log out</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
