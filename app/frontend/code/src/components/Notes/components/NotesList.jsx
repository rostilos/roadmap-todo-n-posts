import React from "react";
import NoteItem from "./NoteItem";

const NotesList = function ({ userNotes, setEditNoteData, deleteNoteRequest }) {
  return (
    <div className="notes-list">
      {Object.keys(userNotes).map((index) => (
        <NoteItem noteData={userNotes[index]} deleteNoteRequest={deleteNoteRequest} setEditNoteData={setEditNoteData} />
      ))}
    </div>
  );
};

export default NotesList;
