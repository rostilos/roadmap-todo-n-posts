import React from "react";

const SidebarItem = function ({ label, icon, path, handleClick }) {
  return (
    <div className="nav-sidebar__item">
      <button type="button" onClick={() => handleClick(path)}>
        <img src={icon} alt="unset" className="nav-sidebar__icon" />
        <span className="nav-sidebar__label">{label}</span>
      </button>
    </div>
  );
};

export default SidebarItem;
