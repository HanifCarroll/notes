import React from "react";
import { message } from "antd";
import styles from "./styles.module.scss";

import { Title, Content, DeleteButton, EditButton } from "elements";

export class Note extends React.Component {
  onEdit = () => {
    const { id, onEdit } = this.props;

    // Passed from NotesContainer.  Populates editable view with the details of the note.
    onEdit(id);
  };

  onDelete = () => {
    const { onDelete } = this.props;

    message.success("Note deleted", 1.5);

    // Passed from NotesContainer to Notes to here.
    // onDelete requires an id, which is bound to this function when mapping over
    // the notes array in the Notes component.
    onDelete();
  };

  renderNote = () => {
    const { title, content } = this.props;

    return (
      <>
        <Title
          titleClassName={styles["note-title"]}
          title={title}
          onClick={this.onEdit}
        />
        <Content
          containerClassName={styles["note-content-container"]}
          contentClassName={styles["note-content"]}
          content={content}
          onClick={this.onEdit}
        />
      </>
    );
  };

  renderButtons = () => {
    return (
      <div className={styles["button-container"]}>
        <DeleteButton
          onConfirm={this.onDelete}
          iconClassName={styles["delete-icon"]}
        />
        <EditButton
          onClick={this.onEdit}
          buttonClassName={styles.button}
          iconClassName={styles["edit-icon"]}
        />
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        {this.renderNote()}
        {this.renderButtons()}
      </div>
    );
  }
}
