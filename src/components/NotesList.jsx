import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import "./NotesList.css";

import Note from "./Note";

const NotesContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // align-items: flex-start;
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
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderNotesList()}
      </Masonry>
      {/* <NotesContainer>{renderNotesList()}</NotesContainer> */}
    </div>
  );
};

export default NotesList;
