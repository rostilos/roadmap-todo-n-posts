import { config } from "../config";
import LocalStorage from "../utils/localStorage";
import { SET_PAGE_MESSAGE } from "../context/App/page/types";
import { responseDataEmpty, responseContainErrors } from "./utility";

export const RESPONSE_TEXT = "text";
export const RESPONSE_JSON = "json";

export default function sendRequest(
  dispatch,
  queryParams = {},
  relativeUrl,
  responseType = "json",
  additionalHeaders = {}
) {
  const headers = {
    ...additionalHeaders,
  };
  const token = LocalStorage.getUserToken();
  const url = `${config.baseUrl}${relativeUrl}`;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify({ ...queryParams }),
  })
    .then((response) => {
      if (response.ok && responseType === RESPONSE_TEXT) {
        return response.text();
      }
      return response.json();
    })
    .then((response) => {
      if (!responseContainErrors(response) || !responseDataEmpty(response)) {
        return response;
      }

      dispatch({
        type: SET_PAGE_MESSAGE,
        payload: { type: "error", message: response?.error?.message || "Something went wrong" },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PAGE_MESSAGE,
        payload: { type: "error", message: "Something went wrong" },
      });
      console.error(err);
      throw err;
    });
}
