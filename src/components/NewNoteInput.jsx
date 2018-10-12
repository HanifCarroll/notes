import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin: 2% 10%;
  text-align: center;
`;

const ContentInput = styled.textarea`
  display: block;
  width: 60%;
  margin: 0 auto;
`;

const SaveButton = styled.button``;

const NewNoteInput = props => {
  const {
    title,
    content,
    onTitleChange,
    onContentChange,
    onNewSave,
    onNewNote,
    newNote
  } = props;

  // For some reason, using a styled component input messes up text insertion.
  const inputStyle = {
    display: newNote ? "block" : "none",
    width: "60%",
    margin: "0 auto"
  };

  return (
    <HeaderContainer>
      <input
        type="text"
        style={inputStyle}
        value={title}
        onChange={e => onTitleChange(e)}
        placeholder="Title"
      />
      <ContentInput
        value={content}
        onChange={e => onContentChange(e)}
        onClick={onNewNote}
        placeholder="Write a note..."
      />

      <SaveButton onClick={onNewSave}>Save</SaveButton>
    </HeaderContainer>
  );
};

export default NewNoteInput;
