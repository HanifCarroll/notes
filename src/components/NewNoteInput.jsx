import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

const HeaderContainer = styled.div`
  text-align: center;
  display: inline-block;
`;

const ContentInputStyle = {
  display: "block",
  width: "60vw",
  fontSize: "16px",
  padding: "10px",
  border: "none",
  resize: "none",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
};

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

  // For some reason, using a styled component input messes up text insertion.
  titleInputStyle = () => ({
    display: this.props.newNote ? "block" : "none",
    width: "60vw",
    margin: "0 auto",
    fontSize: "18px",
    padding: "10px",
    border: "none",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)"
  });

  render() {
    const {
      title,
      content,
      onTitleChange,
      onContentChange,
      onNewNote
    } = this.props;

    // Top level div is needed, because the click handler doesn't work with
    // styled components.
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
          <HeaderContainer>
            <input
              type="text"
              style={this.titleInputStyle()}
              value={title}
              onChange={e => onTitleChange(e)}
              placeholder="Title"
            />
            <TextareaAutosize
              style={ContentInputStyle}
              value={content}
              onChange={e => onContentChange(e)}
              onClick={onNewNote}
              placeholder="Write a note..."
            />
          </HeaderContainer>
        </div>
      </div>
    );
  }
}

export default NewNoteInput;
