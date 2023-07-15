import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function editNote(dispatch, noteData) {
  const relativeUrl = "api/edit_note";
  const result = await sendRequest(dispatch, noteData, relativeUrl, RESPONSE_JSON, {}, true);
  return modifier(result);
}
