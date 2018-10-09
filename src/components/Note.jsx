import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 20%;
  height: 200px;
  border: 2px solid black;
  overflow-y: auto;
  padding: 0 2%;
`;

const ButtonDiv = styled.div``;

const DeleteButton = styled.button``;

const Note = props => {
  const { title, content } = props.note;
  return (
    <StyledContainer>
      <h3>{title}</h3>
      <p>{content}</p>
      <ButtonDiv>
        <DeleteButton onClick={props.onDeleteClick}>Delete</DeleteButton>
      </ButtonDiv>
    </StyledContainer>
  );
};

export default Note;
