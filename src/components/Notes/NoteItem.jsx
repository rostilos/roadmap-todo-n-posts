import React from "react";

const NoteItem = function ({ noteData, setEditNoteData, deleteNoteRequest }) {
  return (
    <div className="note notes-list__item">
      <div className="note__body">
        <p className="note__title">{noteData?.title}</p>
        <p className="note__content">{noteData?.content}</p>
        <p className="note__create-date">{noteData?.created_at}</p>
        <button onClick={() => setEditNoteData(noteData)} className="note__edit _button" type="button">
          Edit
        </button>
      </div>
      <div className="note__actions">
        <button onClick={() => deleteNoteRequest(noteData?.id)} className="note__delete" type="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(NoteItem);
