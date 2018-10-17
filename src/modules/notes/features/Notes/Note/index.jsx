import React from "react";
import { message } from "antd";

import {
  Title,
  Content,
  Input,
  TextArea,
  DeleteButton,
  EditButton,
  Modal
} from "elements";

import styles from "./Note.module.scss";

export class Note extends React.Component {
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

  renderModal = () => {
    if (this.state.edit) {
      return (
        <Modal
          open={this.state.isModalVisible}
          onClose={this.onEditSave}
          classNames={{ modal: styles.modal, overlay: styles.overlay }}
        >
          <div ref={this.setWrapperRef}>
            <Input
              className={styles["title-input"]}
              value={this.state.title}
              onChange={e =>
                this.setState(this.onInputChange("title", e.target.value))
              }
            />
            <TextArea
              className={styles.textarea}
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
        <Title
          titleClassName={styles["note-title"]}
          onClick={this.onEditPress}
          title={this.props.note.title}
        />
        <Content
          containerClassName={styles["note-content-container"]}
          contentClassName={styles["note-content"]}
          onClick={this.onEditPress}
          content={this.props.note.content}
        />
        <div className={styles["button-container"]}>
          <DeleteButton
            onConfirm={this.onDeleteClick}
            iconClassName={styles["delete-icon"]}
          />
          <EditButton
            onClick={this.onEditPress}
            buttonClassName={styles.button}
            iconClassName={styles["edit-icon"]}
          />
        </div>
        {this.renderModal()}
      </div>
    );
  }
}