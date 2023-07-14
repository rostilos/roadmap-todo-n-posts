import { UPDATE_NOTES_LIST } from "./notes/types";
import { fetchNotesReducer } from "./notes/reducers";

const actions = {
  [UPDATE_NOTES_LIST]: fetchNotesReducer,
};

export default function notesReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
