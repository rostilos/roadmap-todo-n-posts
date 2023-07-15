import { useContext } from "react";

import NotesDataContext from "../context/Notes/NotesDataContext";

export default function useNotesContext() {
  const [notesData, notesActions] = useContext(NotesDataContext);
  const { dispatch: notesDispatch } = notesActions;
  return {
    ...notesData,
    ...notesActions,
    notesDispatch,
  };
}
