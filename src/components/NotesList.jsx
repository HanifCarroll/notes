import React from "react";
import styled from "styled-components";
import Note from "./Note";

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NotesList = props => {
  const renderNotesList = () =>
    props.notes.map(note => (
      <Note
        key={note.id}
        note={note}
        onDeleteClick={() => props.onDeleteClick(note.id)}
        onEditSave={props.onEditSave}
      />
    ));

  return (
    <div>
      <h1>Notes List</h1>
      <NotesContainer>{renderNotesList()}</NotesContainer>
    </div>
  );
};

export default NotesList;
