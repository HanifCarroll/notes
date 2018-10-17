export const getNote = (notes, noteId) => {
  if (!notes) return {};

  const note = notes.find(note => note.id === noteId) || {};

  // If the note isn't found (i.e. it's a new note), modal displays empty note.
  const { id = "new", title = "", content = "" } = note;

  return { id, title, content };
};
