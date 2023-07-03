import React from "react";
import useAppContext from "../../hook/useAppContext";

const UserAccount = function () {
  const { userData } = useAppContext();
  return (
    <div>
      <div className="user-account _section">
      <h1 className="page__title">Account Information</h1>

        <p>{userData?.firstname}</p>
        <p>{userData?.lastname}</p>
        <p>{userData?.birth_date}</p>
        <p>{userData?.email}</p>
      </div>
    </div>
  );
};

export default UserAccount;
