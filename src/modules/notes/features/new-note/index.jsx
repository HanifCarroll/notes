import React from "react";

import { Input, TextArea } from "elements";

import styles from "./NewNoteInput.module.scss";

export class NewNoteInput extends React.Component {
  state = { isNewNote: false, title: "", content: "" };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    // If there's no title and no content, then close the form.
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      (!this.state.title && !this.state.content)
    ) {
      this.setState({ isNewNote: false });
    }

    // Otherwise, save te note.
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      (this.state.title || this.state.content)
    ) {
      this.onSave();
    }
  };

  handleTextAreaClick = () => {
    this.setState({ isNewNote: true });
  };

  onChange = propName => e =>
    this.setState({
      [propName]: e.target.value
    });

  onSave = () => {
    const { title, content } = this.state;
    const { onSave } = this.props;

    onSave({ id: "new", title, content });

    this.setState({ title: "", content: "", isNewNote: false });
  };

  render() {
    const { title, content } = this.state;
    const { isNewNote } = this.state;

    return (
      <div className={styles.container}>
        <div ref={node => (this.wrapperRef = node)} className={styles.wrapper}>
          <div>
            <Input
              style={{ display: isNewNote ? "block" : "none" }}
              className={styles["title-input"]}
              value={title}
              onChange={this.onChange("title")}
            />
            <TextArea
              className={styles["content-input"]}
              value={content}
              onChange={this.onChange("content")}
              onClick={this.handleTextAreaClick}
              placeholder="Write a note..."
            />
          </div>
        </div>
      </div>
    );
  }
}
