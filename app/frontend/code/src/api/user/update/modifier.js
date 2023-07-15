export default function updateUserModifier(response) {
  const { ...result } = response;

  return {
    ...result,
  };
}
