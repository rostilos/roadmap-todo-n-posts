export function fetchNotesReducer(state, userNotes) {
  return {
    ...state,
    userNotes: userNotes,
  };
}
