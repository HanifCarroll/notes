import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";

import styles from "./NotesList.module.scss";

import Note from "./Note";

const NotesContainer = styled.div`
  margin: 3% 10% 0 10%;
`;

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  600: 1
};

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
      <Masonry breakpointCols={breakpointColumnsObj} className={styles.grid}>
        {renderNotesList()}
      </Masonry>
    </NotesContainer>
  );
};

export default NotesList;
