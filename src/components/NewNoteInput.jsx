import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

const HeaderContainer = styled.div`
  margin: 2% 10%;
  text-align: center;
`;

const ContentInputStyle = {
  display: "block",
  width: "60%",
  margin: "0 auto",
  fontSize: "16px",
  padding: "10px",
  height: "auto",
  border: "none",
  resize: "none",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
};

const NewNoteInput = props => {
  const {
    title,
    content,
    onTitleChange,
    onContentChange,
    onNewNote,
    newNote
  } = props;

  // For some reason, using a styled component input messes up text insertion.
  const TitleInputStyle = {
    display: newNote ? "block" : "none",
    width: "60%",
    margin: "0 auto",
    fontSize: "18px",
    padding: "10px",
    border: "none",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)"
  };

  return (
    <HeaderContainer>
      <input
        type="text"
        style={TitleInputStyle}
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
  );
};

export default NewNoteInput;
