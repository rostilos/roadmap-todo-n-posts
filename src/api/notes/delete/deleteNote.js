import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function deleteNote(dispatch, noteData) {
  const relativeUrl = "api/delete_note";
  const result = await sendRequest(dispatch, noteData, relativeUrl, RESPONSE_JSON, {}, true);
  return modifier(result);
}
