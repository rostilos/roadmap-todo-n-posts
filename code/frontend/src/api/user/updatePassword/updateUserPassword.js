import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function updateUserPassword(dispatch, userData) {
  const relativeUrl = "api/update_password";
  const result = await sendRequest(dispatch, userData, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
