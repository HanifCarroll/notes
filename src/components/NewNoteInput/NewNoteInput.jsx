import React from "react";
import TextareaAutosize from "react-autosize-textarea";

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
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <div
          ref={this.setWrapperRef}
          style={{
            justifyItems: "center",
            display: "inline-flex",
            margin: "0 auto"
          }}
        >
          <div>
            <input
              type="text"
              style={{ display: isNewNote ? "block" : "none" }}
              className={styles["title-input"]}
              value={title}
              onChange={e => onTitleChange(e)}
              placeholder="Title"
            />
            <TextareaAutosize
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
