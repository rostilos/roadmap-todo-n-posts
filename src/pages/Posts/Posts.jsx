import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { paramsToObject } from "../../api/utility";
import CreatePost from "../../components/Posts/Form/CreatePost";
import PostList from "../../components/Posts/PostList";
import useAppContext from "../../hook/useAppContext";
import usePostsContext from "../../hook/usePostsContext";
import Toolbar from "../../components/Common/Pagination/Toolbar";

const options = [
  { value: "DESC", label: "From new To old" },
  { value: "ASC", label: "From old To new" },
];

const Posts = function () {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState({ value: "DESC", label: "From new To old" });
  const [searchParams] = useSearchParams();

  const { setSuccessMessage, setErrorMessage, isLoggedIn } = useAppContext();
  const { createPost, fetchPosts, posts } = usePostsContext();

  const fetchPostsList = (query) => {
    fetchPosts(query);
  };

  // init query
  useEffect(() => {
    const query = paramsToObject(searchParams);
    fetchPostsList(query);
  }, []);

  const { pagination, data } = posts;

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

  const handleSelectChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const query = paramsToObject(searchParams);
    fetchPostsList({ ...query, sort: selectedOption?.value });
  };

  return (
    <div className="page__posts posts-list ">
      <div className="_section">
        <div className="notes-page__header" style={{ margin: 0 }}>
          <h1 className="page__title">User Posts</h1>
          {isLoggedIn && (
            <div className="notes-page__button-new">
              <button className="_button" type="button" onClick={() => setShowCreatePostForm(!showCreatePostForm)}>
                Add new
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="posts-list__sort-toolbar posts-sort-toolbar">
        <div className="posts-sort-toolbar__select">
          <Select value={selectedSortOption} onChange={handleSelectChange} options={options} />
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

      <Toolbar
        callbackNext={() => fetchPostsList({ page: pagination?.nextPage, limit: pagination?.limit })}
        callbackPrev={() => fetchPostsList({ page: pagination?.prevPage, limit: pagination?.limit })}
        pagination={pagination}
      />
    </div>
  );
};

export default Posts;
