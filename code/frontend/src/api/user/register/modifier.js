export default function registerModifier(response) {
  const { ...result } = response;

  return {
    ...result,
  };
}
