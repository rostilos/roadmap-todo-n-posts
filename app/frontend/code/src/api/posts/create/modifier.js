export default function createPostModifier(response) {
  const { ...result } = response;

  return {
    ...result,
  };
}
