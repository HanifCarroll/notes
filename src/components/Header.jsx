import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin: 0 10%;
  text-align: center;
`;
const TitleInput = styled.input`
  display: block;
  width: 60%;
  margin: 0 auto;
`;
const ContentInput = styled.textarea`
  display: block;
  width: 60%;
  margin: 0 auto;
`;
const SaveButton = styled.button``;

const Header = props => {
  const { title, content, onTitleChange, onContentChange, onNewSave } = props;
  return (
    <HeaderContainer>
      <TitleInput
        type="text"
        value={title}
        onChange={e => onTitleChange(e)}
        onBlur={onNewSave}
      />

      <ContentInput
        value={content}
        onChange={e => onContentChange(e)}
        onBlur={onNewSave}
      />

      <SaveButton onClick={onNewSave}>Save</SaveButton>
    </HeaderContainer>
  );
};

export default Header;
