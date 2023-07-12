import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import UsersList from "../../components/Community/UsersList";
// import useAppContext from "../../hook/useAppContext";
import useCommunityContext from "../../hook/useCommunityContext";
import { paramsToObject } from "../../api/utility";
import Toolbar from "../../components/Common/Pagination/Toolbar";

const Community = function () {
  const { fetchUsers, users } = useCommunityContext();

  const [searchParams] = useSearchParams();

  const fetchUsersList = (query) => {
    fetchUsers(query);
  };

  // init query
  useEffect(() => {
    const query = paramsToObject(searchParams);
    fetchUsersList(query);
  }, []);

  if (!users) {
    return;
  }
  const { pagination, data } = users;

  return (
    <div>
      <div className="community-page _section _section__title">
        <h1 className="page__title">Community members</h1>
      </div>

      {data && <UsersList users={data} />}
      <Toolbar
        callbackNext={() => fetchUsersList({ page: pagination?.nextPage, limit: pagination?.limit })}
        callbackPrev={() => fetchUsersList({ page: pagination?.prevPage, limit: pagination?.limit })}
        pagination={pagination}
      />
    </div>
  );
};

export default Community;
