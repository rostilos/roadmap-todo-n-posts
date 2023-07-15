import { config } from "../config";
import LocalStorage from "../utils/localStorage";
import { SET_PAGE_MESSAGE } from "../context/App/page/types";

export const RESPONSE_TEXT = "text";
export const RESPONSE_JSON = "json";
export const RESPONSE_ERR_STATUS = "error";
export const RESPONSE_SUCCESS_STATUS = "success"

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
    headers.Authorization = 'Bearer ' + token;
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
      if (response?.status === RESPONSE_SUCCESS_STATUS) {
        return response;
      }

      dispatch({
        type: SET_PAGE_MESSAGE,
        payload: { type: RESPONSE_ERR_STATUS, message: response?.message || "Something went wrong" },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PAGE_MESSAGE,
        payload: { type: RESPONSE_ERR_STATUS, message: "Something went wrong" },
      });
      console.error(err);
      throw err;
    });
}
