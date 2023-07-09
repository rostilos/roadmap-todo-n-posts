import React from "react";

const CreateNote = function ({ submitCreateNoteForm, setShowNewNoteForm, showNewNoteForm }) {
  return (
    <div className="_form-popup">
      <div className="_form-popup__overlay" onClick={() => setShowNewNoteForm(false)}></div>
      <div className={`_form-popup__body _section ${showNewNoteForm ? "active" : ""}`}>
        <h1 className="page__title">Add new note</h1>
        <form onSubmit={submitCreateNoteForm} className="_form-popup__form">
          <p>Title</p>
          <input className="_input" name="title" type="text" />

          <p>Content</p>
          <textarea className="_textarea" name="content" style={{ resize: "none" }} />

          <p>Priority</p>
          <div className="_form-popup__priority">
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
        <button type="button" className="_form-popup__close" onClick={() => setShowNewNoteForm(false)}>
          x
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
