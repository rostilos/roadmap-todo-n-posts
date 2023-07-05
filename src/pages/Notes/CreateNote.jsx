import React from "react";

const CreateNote = function ({submitCreateNoteForm}) {
  return (
    <div>
      <div className="create-note _section">
        <h1 className="page__title">Add new note</h1>
        <form onSubmit={submitCreateNoteForm} className="create-note__form">
          Title
          <input className="_input" name="title" type="text" />
          Content
          <input className="_input" name="content" type="text" />
          Priority
          <input className="_input" name="priority" type="number" />
          <button className="_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
