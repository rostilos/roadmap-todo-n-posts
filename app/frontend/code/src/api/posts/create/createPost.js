import modifier from "./modifier";
import sendRequest, { RESPONSE_JSON } from "../../sendRequest";

export default async function createPost(dispatch, newPostData) {
  const relativeUrl = "api/create_post";
  const result = await sendRequest(dispatch, newPostData, relativeUrl, RESPONSE_JSON);

  return modifier(result);
}
