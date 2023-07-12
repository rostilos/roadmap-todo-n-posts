export default function fetchAllUsersModifier(response) {
  const { ...result } = response;

  return {
    ...result,
  };
}
