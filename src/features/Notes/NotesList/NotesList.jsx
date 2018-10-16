import React from "react";
import Masonry from "react-masonry-css";

import Note from "../Note/Note";

import styles from "./NotesList.module.scss";

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
    <div className={styles.container}>
      <Masonry breakpointCols={breakpointColumnsObj} className={styles.grid}>
        {renderNotesList()}
      </Masonry>
    </div>
  );
};

export default NotesList;
