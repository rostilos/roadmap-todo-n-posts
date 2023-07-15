import React from "react";
import UserCard from "./UserCard";

const UsersList = function ({ users }) {
  return (
    <div className="users-list">
      {Object.keys(users).map((index) => (
        <UserCard userData={users[index]} />
      ))}
    </div>
  );
};

export default UsersList;
