import React from "react";

import { Input, TextArea } from "elements";

import styles from "./NewNoteInput.module.scss";

class NewNoteInput extends React.Component {
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (!this.props.title.length && !this.props.content.length) {
        return this.props.onCancelNewNote();
      }
      this.props.onNewSave();
    }
  };

  render() {
    const {
      title,
      content,
      onTitleChange,
      onContentChange,
      onNewNote,
      isNewNote
    } = this.props;

    return (
      <div className={styles.container}>
        <div ref={this.setWrapperRef} className={styles.wrapper}>
          <div>
            <Input
              style={{ display: isNewNote ? "block" : "none" }}
              className={styles["title-input"]}
              value={title}
              onChange={e => onTitleChange(e)}
            />
            <TextArea
              className={styles["content-input"]}
              value={content}
              onChange={e => onContentChange(e)}
              onClick={onNewNote}
              placeholder="Write a note..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewNoteInput;
