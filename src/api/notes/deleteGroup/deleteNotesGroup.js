import sendRequest, { RESPONSE_TEXT } from "../../sendRequest";

export default async function deleteNotesGroup(dispatch, priority) {
  const relativeUrl = "api/delete_notes_group";
  await sendRequest(dispatch, priority, relativeUrl, RESPONSE_TEXT, {}, true);
}
