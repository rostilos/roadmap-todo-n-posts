import React from "react";

const NoteItem = function ({ noteData }) {
  return (
    <div className="note notes-list__item">
      <div className="note__body">
        <p className="note__title">{noteData?.title}</p>
        <p className="note__content">{noteData?.content}</p>
        <p className="note__create-date">{noteData?.created_at}</p>
        <button className="note__edit _button" type="button">
          Edit
        </button>
      </div>
      <div className="note__actions">
        <button className="note__delete" type="button">
          Delete
        </button>
        <button className="note__change-status" type="button">
          Done!
        </button>
      </div>
    </div>
  );
};

export default React.memo(NoteItem);
