import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { paramsToObject } from "../../api/utility";
import CreatePost from "../../components/Posts/Form/CreatePost";
import PostList from "../../components/Posts/PostList";
import useAppContext from "../../hook/useAppContext";
import usePostsContext from "../../hook/usePostsContext";

const Posts = function () {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [searchParams] = useSearchParams();

  const { setSuccessMessage, setErrorMessage } = useAppContext();
  const { createPost, fetchPosts, posts } = usePostsContext();

  // init query
  useEffect(() => {
    const query = paramsToObject(searchParams);
    fetchPosts(query);
  }, []);

  const { pagination, data } = posts;

  console.log(data);

  const submitCreatePostForm = async (values) => {
    try {
      const status = await createPost(values);
      if (status) {
        setShowCreatePostForm(false);
        setSuccessMessage("You have successfully added a new note");
        // navigate("/");
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="page__posts posts-list ">
      <div className="_section">
        <div className="notes-page__header" style={{ margin: 0 }}>
          <h1 className="page__title">User Posts</h1>
          <div className="notes-page__button-new">
            <button className="_button" type="button" onClick={() => setShowCreatePostForm(!showCreatePostForm)}>
              Add new
            </button>
          </div>
        </div>
      </div>

      {showCreatePostForm && (
        <CreatePost
          submitCreatePostForm={submitCreatePostForm}
          showCreatePostForm={showCreatePostForm}
          setShowCreatePostForm={setShowCreatePostForm}
        />
      )}
      {data && <PostList posts={data} />}
    </div>
  );
};

export default Posts;
