import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function updateUser(dispatch, userData) {
  const relativeUrl = "api/user_update";
  const result = await sendRequest(dispatch, userData, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
