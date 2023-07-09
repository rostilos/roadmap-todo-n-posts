import React from "react";

const EditNote = function ({ editNoteData, setEditNoteData, submitEditNoteForm }) {
  return (
    <div className="_form-popup ">
      <div className="_form-popup__overlay" onClick={() => setEditNoteData(null)}></div>
      <div className={`_form-popup__body _section ${editNoteData ? "active" : ""}`}>
        <h1 className="page__title">Edit note</h1>
        <form onSubmit={submitEditNoteForm} className="_form-popup__form">
          <input type="hidden" name="id" defaultValue={editNoteData?.id} />
          <p>Title</p>
          <input defaultValue={editNoteData?.title} className="_input" name="title" type="text" />

          <p>Content</p>
          <textarea
            defaultValue={editNoteData?.content}
            className="_textarea"
            name="content"
            style={{ resize: "none" }}
          />

          <p>Priority</p>
          <div className="_form-popup__priority">
            <div>
              <input
                defaultChecked={editNoteData?.priority === 0}
                type="radio"
                className="_radio"
                id="low"
                name="priority"
                value="0"
              />
              <label for="low">Low</label>
            </div>
            <div>
              <input
                defaultChecked={editNoteData?.priority === 1}
                type="radio"
                className="_radio"
                id="medium"
                name="priority"
                value="1"
              />
              <label for="medium">Medium</label>
            </div>
            <div>
              <input
                defaultChecked={editNoteData?.priority === 2}
                type="radio"
                className="_radio"
                id="high"
                name="priority"
                value="2"
              />
              <label for="high">High</label>
            </div>
          </div>
          <button className="_button" type="submit">
            Submit
          </button>
        </form>
        <button type="button" className="_form-popup__close" onClick={() => setEditNoteData(null)}>
          x
        </button>
      </div>
    </div>
  );
};

export default EditNote;
