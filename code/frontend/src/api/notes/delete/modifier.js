export default function deleteNoteModifier(response) {
    const { ...result } = response;
    return {
      ...result,
    };
  }
  