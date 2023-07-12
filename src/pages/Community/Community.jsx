import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import UsersList from "../../components/Community/UsersList";
import useAppContext from "../../hook/useAppContext";
import useCommunityContext from "../../hook/useCommunityContext";

const Community = function () {
  const { fetchUsers, users } = useCommunityContext();
  const { setSuccessMessage, setErrorMessage } = useAppContext();

  useEffect(() => {
    if (isEmpty(users)) {
      fetchUsers();
    }
  }, []);

  //   const filteredNotes =
  //     activeTabId === 3
  //       ? userNotes
  //       : Object.keys(userNotes)
  //           .filter((key) => userNotes[key].priority === activeTabId)
  //           .reduce((obj, key) => {
  //             return Object.assign(obj, {
  //               [key]: userNotes[key],
  //             });
  //           }, {});

  return (
    <div>
      <div className="community-page _section _section__title">
        <h1 className="page__title">Community members</h1>
      </div>
      <UsersList users={users} />
    </div>
  );
};

export default Community;
