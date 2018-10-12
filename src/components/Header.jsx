import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin: 0 10%;
  text-align: center;
`;

const ContentInput = styled.textarea`
  display: block;
  width: 60%;
  margin: 0 auto;
`;

const SaveButton = styled.button``;

const Header = props => {
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
      />
      <ContentInput
        value={content}
        onChange={e => onContentChange(e)}
        onClick={onNewNote}
      />

      <SaveButton onClick={onNewSave}>Save</SaveButton>
    </HeaderContainer>
  );
};

export default Header;
