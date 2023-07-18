import { isEmpty } from "lodash";
import React from "react";
import { useEffect } from "react";
import usePostsContext from "../../hook/usePostsContext";
import LastUpdatesItem from "./LastUpdatesItem";

const LastUpdates = function () {
  const { fetchRecentPosts, recentPosts } = usePostsContext();

  useEffect(() => {
    if (isEmpty(recentPosts)) {
      fetchRecentPosts();
    }
  }, []);
  return (
    <div className="page__updates last-updates">
      <div className="_section">
        <p className="page__title">Last community Updates</p>

        {!isEmpty(recentPosts) && recentPosts.map((post) => <LastUpdatesItem postData={post} />)}
        {isEmpty(recentPosts) && <p>There are no posts here yet</p>}
      </div>
    </div>
  );
};

export default LastUpdates;
