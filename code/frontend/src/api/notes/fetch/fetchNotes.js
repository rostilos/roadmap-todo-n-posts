import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function fetchNotes(dispatch) {
  const relativeUrl = "api/user_notes";
  const result = await sendRequest(dispatch, null, relativeUrl, RESPONSE_JSON, {}, true);
  return modifier(result);
}
