import React from "react";
import PostPreviewItem from "./PostPreviewItem";

const PostList = function ({ posts }) {
    console.log(posts);
  return (
    <div className="posts-list">
      {Object.keys(posts).map((index) => (
        <PostPreviewItem postData={posts[index]} />
      ))}
    </div>
  );
};

export default PostList;
