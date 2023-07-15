import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function createNote(dispatch, noteData) {
  const relativeUrl = "api/create_note";
  const result = await sendRequest(dispatch, noteData, relativeUrl, RESPONSE_JSON, {}, true);
  return modifier(result);
}
