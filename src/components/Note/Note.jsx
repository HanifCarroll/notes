import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Popconfirm, message, Icon } from "antd";
import Modal from "react-responsive-modal";

import styles from "./Note.module.scss";

class Note extends React.Component {
  state = {
    edit: false,
    title: "",
    content: "",
    id: "",
    isModalVisible: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      title: this.props.note.title,
      content: this.props.note.content,
      id: this.props.note.id
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.edit) {
        this.onEditSave();
      }
    }
  };

  onEditPress = () => {
    this.setState({
      edit: true,
      title: this.props.note.title,
      content: this.props.note.content,
      id: this.props.note.id,
      isModalVisible: true
    });
  };

  onInputChange = (propertyName, value) => () => ({
    [propertyName]: value
  });

  onEditSave = () => {
    const { id, content, title } = this.state;
    this.props.onEditSave({ id, title, content });
    this.setState({ edit: false, isModalVisible: false });
  };

  onDeleteClick = () => {
    this.props.onDeleteClick();
    message.success("Note deleted", 1.5);
  };

  renderNoteTitle = () => {
    return (
      <h3 className={styles["note-title"]} onClick={this.onEditPress}>
        {this.props.note.title}
      </h3>
    );
  };

  renderNoteContent = () => {
    return (
      <div
        className={styles["note-content-container"]}
        onClick={this.onEditPress}
      >
        <p className={styles["note-content"]}>{this.props.note.content}</p>
      </div>
    );
  };

  renderEditButton = () => {
    if (this.state.edit) {
      return (
        <button className={styles.button} onClick={this.onEditSave}>
          <Icon className={styles["edit-icon"]} type="check" theme="outlined" />
        </button>
      );
    }
    return (
      <button className={styles.button} onClick={this.onEditPress}>
        <Icon className={styles["edit-icon"]} type="edit" theme="outlined" />
      </button>
    );
  };

  renderDeleteButton = () => {
    if (this.state.edit) {
      return (
        <button
          className={styles.button}
          onClick={() => this.setState({ edit: false })}
        >
          <Icon
            type="close"
            theme="outlined"
            className={styles["delete-icon"]}
          />
        </button>
      );
    }
    return (
      <Popconfirm
        title="Are you sure you want to delete this note?"
        onConfirm={this.onDeleteClick}
        okText="Yes"
        cancelText="No"
      >
        <Icon
          type="delete"
          theme="outlined"
          className={styles["delete-icon"]}
        />
      </Popconfirm>
    );
  };

  renderModal = () => {
    if (this.state.edit) {
      return (
        <Modal
          open={this.state.isModalVisible}
          onClose={this.onEditSave}
          showCloseIcon={false}
          classNames={{ modal: styles.modal, overlay: styles.overlay }}
          animationDuration={300}
        >
          <div ref={this.setWrapperRef}>
            <input
              className={styles["title-input"]}
              type="text"
              value={this.state.title}
              onChange={e =>
                this.setState(this.onInputChange("title", e.target.value))
              }
              placeholder="Title"
            />
            <TextareaAutosize
              className={styles.textarea}
              wrap="hard"
              onChange={e =>
                this.setState(this.onInputChange("content", e.target.value))
              }
              value={this.state.content}
              placeholder="Note"
            />
          </div>
        </Modal>
      );
    }
  };

  render() {
    return (
      <div className={styles.container}>
        {this.renderNoteTitle()}
        {this.renderNoteContent()}
        <div className={styles["button-container"]}>
          {this.renderDeleteButton()}
          {this.renderEditButton()}
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default Note;
