import { fetchPostViewRequest, fetchAllPostsRequest, createPostRequest } from "../../../api";

import { UPDATE_POSTS_LIST } from "./types";
import { isEmpty } from "lodash";

export async function fetchPostsAction(dispatch, query) {
  try {
    const response = await fetchAllPostsRequest(dispatch, query);
    if (!isEmpty(response?.data)) {
      dispatch({
        type: UPDATE_POSTS_LIST,
        payload: response,
      });
    } else {
      dispatch({
        type: UPDATE_POSTS_LIST,
        payload: {},
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPostViewAction(dispatch, id) {
  try {
    const response = await fetchPostViewRequest(dispatch, id);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPostAction(dispatch, newPostData) {
  try {
    const response = await createPostRequest(dispatch, newPostData);
    // if (response) {
    //   fetchNotesAction(dispatch);
    //   return response;
    // }
  } catch (error) {
    console.error(error);
  }
}
