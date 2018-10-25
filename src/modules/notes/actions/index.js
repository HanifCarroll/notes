import short from "short-uuid";

export const onCreate = (notes, note) => {
  const { title, content } = note;

  if (!title.length && !content.length) return;

  return [...notes, { title, content, id: short.uuid() }];
};

export const onUpdate = (notes, note) => {
  const { id } = note;

  return notes.map(currentNote => (currentNote.id === id ? note : currentNote));
};

export const onDelete = (notes, note) => {
  const { id } = note;

  return notes.filter(note => note.id !== id);
};
