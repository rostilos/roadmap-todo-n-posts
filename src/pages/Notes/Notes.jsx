import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import useNotesContext from "../../hook/useNotesContext";
import CreateNote from "./CreateNote";
import NotesList from "./NotesList";

const Notes = function () {
  const { createNote, fetchNotes, userNotes } = useNotesContext();

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

  return (
    <div className="notes-page">
      <form onSubmit={submitCreateNoteForm}>
        Notes
        {/* <input className="_input" name="birth_date" type="date" id="" /> */}
        <button type="submit">POST TEST</button>
      </form>
      {!isEmpty(userNotes) && <NotesList userNotes={userNotes} />}
      <CreateNote submitCreateNoteForm={submitCreateNoteForm} />
    </div>
  );
};

export default Notes;
