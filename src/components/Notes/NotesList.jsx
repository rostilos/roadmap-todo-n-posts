import React from "react";
import NoteItem from "./NoteItem";

const NotesList = function ({ userNotes }) {
  console.log(userNotes);
  return (
    <div className="notes-list">
      {Object.keys(userNotes).map((index) => (
        <NoteItem noteData={userNotes[index]} />
      ))}
    </div>
  );
};

export default React.memo(NotesList);
