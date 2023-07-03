import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function createNote(dispatch, postData) {
  const relativeUrl = "api/create_note";
  const result = await sendRequest(dispatch, postData, relativeUrl, RESPONSE_JSON, {}, true);
  return modifier(result);
}
