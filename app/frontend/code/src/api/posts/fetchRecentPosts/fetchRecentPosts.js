import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function fetchRecentPosts(dispatch, query) {
  const relativeUrl = "api/fetch_recent_posts";
  const result = await sendRequest(dispatch, query, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
