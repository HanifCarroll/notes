import React from "react";
import styled from "styled-components";

const TextEditor = styled.textarea`
  color: red;
`;

const SaveButton = styled.button`
  color: red;
`;

const Editor = props => {
  return (
    <div>
      <h1>Editor</h1>
      <TextEditor
        value={props.content}
        onChange={e => props.onContentChange(e)}
      />
      <SaveButton onClick={props.onSaveClick}>Save</SaveButton>
    </div>
  );
};

export default Editor;
