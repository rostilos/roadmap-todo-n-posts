import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function ajaxLogin(dispatch, loginData) {
  const relativeUrl = "api/login";
  const result = await sendRequest(dispatch, loginData, relativeUrl, RESPONSE_JSON, {}, true);

  return modifier(result);
}
