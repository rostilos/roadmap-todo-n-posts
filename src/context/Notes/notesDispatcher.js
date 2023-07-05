import { fetchNotesAction, createNoteAction } from "./notes/actions";

const dispatchMapper = {
  fetchNotes: fetchNotesAction,
  createNote: createNoteAction,
};

export default function notesDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
