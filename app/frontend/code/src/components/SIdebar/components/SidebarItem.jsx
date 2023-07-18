import React from "react";
import { useLocation } from "react-router-dom";

const SidebarItem = function ({ label, icon, path, handleClick, isActive }) {
  const location = useLocation();

  if (path.includes("/posts") && location.pathname.includes("posts")) {
    isActive = true;
  }
  return (
    <div className={`nav-sidebar__item ${isActive ? "nav-sidebar__item--active" : ""}`}>
      <button type="button" onClick={() => handleClick(path)}>
        <img src={icon} alt="unset" className="nav-sidebar__icon" />
        <span className="nav-sidebar__label">{label}</span>
      </button>
    </div>
  );
};

export default React.memo(SidebarItem);
