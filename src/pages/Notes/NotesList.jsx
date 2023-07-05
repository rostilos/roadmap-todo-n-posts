import React from "react";

const NotesList = function ({userNotes}) {
  console.log(userNotes);
  return Object.keys(userNotes).map((index) => {
    return <div>{JSON.stringify(userNotes[index])}</div>;
  });
};

export default React.memo(NotesList);
