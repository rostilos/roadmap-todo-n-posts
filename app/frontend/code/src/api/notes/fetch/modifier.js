export default function fetchNotesModifier(response) {
    const { ...result } = response;
    return {
      ...result,
    };
  }
  