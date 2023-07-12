import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function fetchAllUsers(dispatch, userData) {
  const relativeUrl = "api/fetch_users";
  const result = await sendRequest(dispatch, userData, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
