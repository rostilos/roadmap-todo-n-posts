import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import usePostsContext from "../../hook/usePostsContext";

const PostView = function () {
  const { id } = useParams();
  const { fetchPostView } = usePostsContext();
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!postData) {
      async function fetchData() {
        const response = await fetchPostView({ id: id });
        if (response) {
          setPostData(response);
        }
      }
      fetchData();
    }
  }, []);

  if (!postData?.data) {
    return;
  }
  const { firstname, lastname, title, content, created_at } = postData?.data;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div className="page__post-view post-view ">
      <div className="_section">
        <div className="notes-page__header" style={{ margin: 0 }}>
          <h1 className="page__title">Article View</h1>

          <div className="notes-page__button-new">
            <Link className="_button" to="/posts">
              Back
            </Link>
          </div>
        </div>
      </div>
      <div className="post-view__body _section">
        <div className="post-view__info">
          <p className="page__title post-view__title">{title}</p>
          <p className="post-view__author">Author: {fullname}</p>

          <p className="post-view__content">{content}</p>
          <p className="post-view__created-at">Posted: {created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default PostView;
