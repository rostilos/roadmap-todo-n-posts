import { isEmpty } from "lodash";
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
        if (response?.data) {
          setPostData(response?.data);
        }
      }
      fetchData();
    }
  }, []);

  if (isEmpty(postData)) {
    return;
  }
  const { firstname, lastname, title, content, created_at } = postData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div className="page__post-view post-view ">
      <div className="_section">
        <div className="post-view__header" style={{ margin: 0 }}>
          <h1 className="page__title">Post View</h1>

          <div className="post-view__button-new">
            <Link className="_button" to="/posts">
              To Posts List
            </Link>
          </div>
        </div>
      </div>
      {!isEmpty(postData) && (
        <div className="post-view__body _section">
          <div className="post-view__info">
            <p className="page__title post-view__title">{title}</p>
            <p className="post-view__author">Author: {fullname}</p>

            <p className="post-view__content">{content}</p>
            <p className="post-view__created-at">Posted: {created_at}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostView;
