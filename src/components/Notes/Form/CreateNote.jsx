import React from "react";

const CreateNote = function ({ submitCreateNoteForm, setShowNewNoteForm }) {
  return (
    <div className="create-note ">
      <div className="create-note__body _section">
        <h1 className="page__title">Add new note</h1>
        <form onSubmit={submitCreateNoteForm} className="create-note__form">
          <p>Title</p>
          <input className="_input" name="title" type="text" />

          <p>Content</p>
          <textarea className="_textarea" name="content"  style={{ resize: "none" }} />

          <p>Priority</p>
          <div className="create-note__priority">
            <div>
              <input type="radio" className="_radio" id="low" name="priority" value="0" />
              <label for="low">Low</label>
            </div>
            <div>
              <input type="radio" className="_radio" id="medium" name="priority" value="1" />
              <label for="medium">Medium</label>
            </div>
            <div>
              <input type="radio" className="_radio" id="high" name="priority" value="2" />
              <label for="high">High</label>
            </div>
          </div>
          <button className="_button" type="submit">
            Submit
          </button>
        </form>
        <button type="button" className="create-note__close" onClick={() => setShowNewNoteForm(false)}>
          x
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
