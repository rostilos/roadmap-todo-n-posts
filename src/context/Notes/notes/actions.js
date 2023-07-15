import _get from "lodash.get";
import { fetchNotesRequest, createNoteRequest, editNoteRequest, deleteNoteRequest } from "../../../api";

import { UPDATE_NOTES_LIST } from "./types";
import { isEmpty } from "lodash";

export async function fetchNotesAction(dispatch) {
  try {
    const response = await fetchNotesRequest(dispatch);
    if (!isEmpty(response?.data)) {
      dispatch({
        type: UPDATE_NOTES_LIST,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: UPDATE_NOTES_LIST,
        payload: {},
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createNoteAction(dispatch, noteData) {
  try {
    const response = await createNoteRequest(dispatch, noteData);
    if (response?.status) {
      fetchNotesAction(dispatch);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function editNoteAction(dispatch, noteData) {
  try {
    const response = await editNoteRequest(dispatch, noteData);
    if (response?.status) {
      fetchNotesAction(dispatch);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteNoteAction(dispatch, noteData) {
  try {
    await deleteNoteRequest(dispatch, noteData);
    fetchNotesAction(dispatch);
  } catch (error) {
    console.error(error);
  }
}
