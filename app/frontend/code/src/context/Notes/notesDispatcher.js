import {
  fetchNotesAction,
  createNoteAction,
  editNoteAction,
  deleteNoteAction,
  deleteNotesGroupAction,
} from "./notes/actions";

const dispatchMapper = {
  fetchNotes: fetchNotesAction,
  createNote: createNoteAction,
  editNote: editNoteAction,
  deleteNote: deleteNoteAction,
  deleteNotesGroup: deleteNotesGroupAction,
};

export default function notesDispatcher(dispatch) {
  const dispatchers = { dispatch };
  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
  });

  return dispatchers;
}
