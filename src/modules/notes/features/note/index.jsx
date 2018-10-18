import React from "react";
import { message } from "antd";
import styles from "./styles.module.scss";

import { Title, Content, DeleteButton, EditButton } from "elements";

export class Note extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.contentInput = React.createRef();
  }

  onEdit = initialClick => {
    const { id, onEdit } = this.props;

    // Passed from NotesContainer.  Populates editable view with the details of the note.
    onEdit(id, initialClick);
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
          onClick={() => this.onEdit("title")}
        />
        <Content
          containerClassName={styles["note-content-container"]}
          contentClassName={styles["note-content"]}
          content={content}
          onClick={() => this.onEdit("content")}
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
