import _get from "lodash.get";
import { fetchNotesRequest, createNoteRequest, editNoteRequest, deleteNoteRequest } from "../../../api";

import { UPDATE_NOTES_LIST } from "./types";
import { isEmpty } from "lodash";

export async function fetchNotesAction(dispatch) {
  try {
    const response = await fetchNotesRequest(dispatch);
    if (!isEmpty(response)) {
      dispatch({
        type: UPDATE_NOTES_LIST,
        payload: response,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createNoteAction(dispatch, noteData) {
  try {
    const response = await createNoteRequest(dispatch, noteData);
    const { errors, status } = response;
    if (!errors && status) {
      return status;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function editNoteAction(dispatch, noteData) {
  try {
    const response = await editNoteRequest(dispatch, noteData);
    const { errors, status } = response;
    if (!errors && status) {
      return status;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteNoteAction(dispatch, noteData) {
  try {
    const response = await deleteNoteRequest(dispatch, noteData);
    const { errors, status } = response;
    if (!errors && status) {
      return status;
    }
  } catch (error) {
    console.error(error);
  }
}
