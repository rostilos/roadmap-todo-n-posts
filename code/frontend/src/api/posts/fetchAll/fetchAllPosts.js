import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function fetchAllPosts(dispatch, query) {
  const relativeUrl = "api/fetch_posts";
  const result = await sendRequest(dispatch, query, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
