import React from "react";
import styled from "styled-components";

const TitleInput = styled.input``;
const ContentInput = styled.textarea``;
const SaveButton = styled.button``;

const Header = props => {
  const { title, content, onTitleChange, onContentChange, onNewSave } = props;
  return (
    <div>
      <TitleInput type="text" value={title} onChange={e => onTitleChange(e)} />
      <ContentInput value={content} onChange={e => onContentChange(e)} />
      <SaveButton onClick={onNewSave}>Save</SaveButton>
    </div>
  );
};

export default Header;
