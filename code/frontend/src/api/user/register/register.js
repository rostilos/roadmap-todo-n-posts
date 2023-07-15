import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function register(dispatch, userData) {
  const relativeUrl = "api/register";
  const result = await sendRequest(dispatch, userData, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
