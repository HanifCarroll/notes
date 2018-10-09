import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  overflow-y: auto;
`;

const Note = props => {
  const { title, content } = props.note;
  return (
    <StyledContainer>
      <h3>{title}</h3>
      <p>{content}</p>
    </StyledContainer>
  );
};

export default Note;
