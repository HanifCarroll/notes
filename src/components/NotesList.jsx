import React from "react";
import styled from "styled-components";
import Note from "./Note";

const NotesList = props => {
  const renderNotesList = () =>
    props.notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes List</h1>
      <ul>{renderNotesList()}</ul>
    </div>
  );
};

export default NotesList;
