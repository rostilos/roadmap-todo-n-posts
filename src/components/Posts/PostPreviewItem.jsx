import React from "react";

const PostPreviewItem = function ({ postData }) {
  const { firstname, lastname, title, content, created_at } = postData;
  const fullname = `${firstname} ${lastname}`;
  return (
    <div className="posts-list__item post-preview _section">
      <div className="post-preview__body">
        <div className="post-preview__info">
          <p className="post-preview__title">{title}</p>

          <p className="post-preview__content">{content}</p>
          <p className="post-preview__author">Author: {fullname}</p>
          <p className="post-preview__created-at">Posted: {created_at}</p>
        </div>
        <div className="post-preview__read-full">
          <button className="_button" type="button">
            Read full Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostPreviewItem);
