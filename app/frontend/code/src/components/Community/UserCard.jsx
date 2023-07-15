import React from "react";
import userImagePlaceHolder from "../../assets/images/user/user-image-placeholder.png";

const UserCard = function ({ userData }) {
  const { firstname, lastname, email, birth_date } = userData;
  const fullname = `${firstname} ${lastname}`;
  return (
    <div className="users-list__item user-card _section">
      <div className="user-card__body">
        <img src={userImagePlaceHolder} alt="User profile placeholder" className="user-card__image" />
        <div className="user-card__info">
          <p className="user-card__fullname">{fullname}</p>
          <p className="user-card__email">{email}</p>
          <p className="user-card__birth-date">{birth_date}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
