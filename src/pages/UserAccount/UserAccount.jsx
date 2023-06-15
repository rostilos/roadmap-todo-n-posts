import React from "react";
import useAppContext from "../../hook/useAppContext";

const UserAccount = function () {
  const { userData } = useAppContext();
  return (
    <div className="user-account _section">
      <p>{userData?.firstname}</p>
      <p>{userData?.lastname}</p>
      <p>{userData?.birth_date}</p>
      <p>{userData?.email}</p>
    </div>
  );
};

export default UserAccount;
