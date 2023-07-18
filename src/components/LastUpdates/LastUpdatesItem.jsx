import React from "react";
import { Link } from "react-router-dom";
import userImagePlaceHolder from "../../assets/images/user/user-image-placeholder.png";

const LastUpdatesItem = function ({ postData }) {
  const { id, firstname, lastname, title, created_at } = postData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div className="last-updates__item last-updates-item">
      <div className="last-updates-item__body">
        <img src={userImagePlaceHolder} alt="User profile placeholder" className="last-updates-item__image" />

        <div className="last-updates-item__info">
          <p className="last-updates-item__author">{fullname}</p>
          <p className="last-updates-item__title">{title}</p>
          <p className="last-updates-item__created-at">Posted: {created_at}</p>
        </div>
        <div className="last-updates-item__read-full">
          <Link className="_button" to={`/posts/view/${id}`}>
            Read Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LastUpdatesItem;
