import React from "react";
import Masonry from "react-masonry-css";
import styles from "./styles.module.scss";
import { Note } from "../../../../modules/notes";

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  600: 1
};

export class Notes extends React.Component {
  renderNotes = () => {
    const { notes, onDelete, onEdit } = this.props;

    return (
      <Masonry breakpointCols={breakpointColumns} className={styles.grid}>
        {notes.map(note => {
          const { id, title, content } = note;
          return (
            <Note
              key={id}
              id={id}
              title={title}
              content={content}
              onDelete={onDelete.bind(this, id)}
              onEdit={onEdit}
            />
          );
        })}
      </Masonry>
    );
  };

  render() {
    // Coming from NotesContainer
    const { notes } = this.props;

    const data =
      notes && notes.length ? (
        this.renderNotes()
      ) : (
        <p className={styles["no-notes"]}>No notes!</p>
      );

    return <div className={styles.container}>{data}</div>;
  }
}
