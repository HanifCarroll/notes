import React from "react";
import styled from "styled-components";

const InputTitle = styled.input``;

const Title = props => {
  return (
    <div>
      <h1>Title</h1>
      <InputTitle
        type="text"
        value={props.title}
        onChange={e => props.onTitleChange(e)}
      />
    </div>
  );
};

export default Title;
