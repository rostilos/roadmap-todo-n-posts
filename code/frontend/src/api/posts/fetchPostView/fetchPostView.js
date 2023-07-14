import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function fetchPostView(dispatch, id) {
  const relativeUrl = "api/fetch_post_view";
  const result = await sendRequest(dispatch, id, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
