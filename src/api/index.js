import ajaxLogin from "./user/login";
import register from "./user/register";
import fetchNotes from "./notes/fetch/";
import createNote from "./notes/create";
import editNote from "./notes/edit";
import deleteNote from "./notes/delete";

export const ajaxLoginRequest = ajaxLogin;
export const registerRequest = register;
export const fetchNotesRequest = fetchNotes;
export const createNoteRequest = createNote;
export const editNoteRequest = editNote;
export const deleteNoteRequest = deleteNote;
