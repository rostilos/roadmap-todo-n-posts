export default function fetchRecentPostsModifier(response) {
  const { ...result } = response;
  return {
    ...result,
  };
}
