export default function editNoteModifier(response) {
    const { ...result } = response;
    return {
      ...result,
    };
  }
  