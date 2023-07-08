import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import useNotesContext from "../../hook/useNotesContext";
import CreateNote from "../../components/Notes/Form/CreateNote";
import NotesList from "../../components/Notes/NotesList";
import EditNote from "../../components/Notes/Form/EditNote";

const Notes = function () {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);
  const { createNote, fetchNotes, userNotes, editNote, deleteNote } = useNotesContext();

  useEffect(() => {
    // if (isEmpty(userNotes)) {
    fetchNotes();
    // }
  }, []);
  const submitCreateNoteForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteData = {
      title: formData.get("title"),
      content: formData.get("content"),
      priority: formData.get("priority"),
    };
    try {
      const status = await createNote(noteData);
      if (status) {
        // setSuccessMessage("You have successfully registered your account");
        // navigate("/");
        console.log(status);
        fetchNotes();
      } else {
        // setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  const submitEditNoteForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteData = {
      id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
      priority: formData.get("priority"),
    };
    try {
      const status = await editNote(noteData);
      if (status) {
        // setSuccessMessage("You have successfully registered your account");
        // navigate("/");
        console.log(status);
        fetchNotes();
      } else {
        // setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  const deleteNoteRequest = async (id) => {
    try {
      const status = await deleteNote({ id: id });
      if (status) {
        // setSuccessMessage("You have successfully registered your account");
        // navigate("/");
        console.log(status);
        fetchNotes();
      } else {
        // setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  return (
    <div className="notes-page">
      <div className="notes-page__content _section">
        <form onSubmit={submitCreateNoteForm}>
          Notes
          {/* <input className="_input" name="birth_date" type="date" id="" /> */}
          <button type="submit">POST TEST</button>
        </form>
        {!isEmpty(userNotes) && (
          <NotesList deleteNoteRequest={deleteNoteRequest} setEditNoteData={setEditNoteData} userNotes={userNotes} />
        )}
        <div className="notes-page__button-new">
          <button class="_button" type="button" onClick={() => setShowNewNoteForm(!showNewNoteForm)}>
            Add new
          </button>
        </div>
        {showNewNoteForm && (
          <CreateNote setShowNewNoteForm={setShowNewNoteForm} submitCreateNoteForm={submitCreateNoteForm} />
        )}
        {editNoteData && (
          <EditNote
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
            submitEditNoteForm={submitEditNoteForm}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
