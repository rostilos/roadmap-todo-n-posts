export default function createNoteModifier(response) {
    const { ...result } = response;
    return {
      ...result,
    };
  }
  