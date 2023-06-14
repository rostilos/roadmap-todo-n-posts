import React from "react";
import logo from '../../../assets/images/logo.svg'

const Header = function () {
  return (
    <header className="page__header header">
      <div className="header__container _container grid-2-cols">
        <div className="header__logo">
          <img src={logo} alt="" />
        </div>
        <div className="header__user-info user-info">
          Log in
          <img src="" alt="" />
        </div>
      </div>
      
    </header>
  );
};

export default Header;
