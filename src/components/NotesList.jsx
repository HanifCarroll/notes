import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import "./NotesList.css";

import Note from "./Note";

const NotesContainer = styled.div`
  margin: 0 10%;
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
    <NotesContainer>
      <h1>Notes List</h1>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderNotesList()}
      </Masonry>
    </NotesContainer>
  );
};

export default NotesList;
