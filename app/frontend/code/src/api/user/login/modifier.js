export default function ajaxLoginModifier(response) {
  const { ...result } = response;
  return {
    ...result,
  };
}
