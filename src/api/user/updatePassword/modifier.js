export default function updateUserPasswordModifier(response) {
  const { ...result } = response;

  return {
    ...result,
  };
}
