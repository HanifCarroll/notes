import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  grid-gap: 30px;
  grid-template-areas: ". .";
  height: 100%;
  border: 2px solid black;
  padding: 1%;
`;

const StyledLogo = styled.h1`
  text-align: right;
`;

const SearchInput = styled.input`
  margin: auto 0;
  width: 80%;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo>Notes</StyledLogo>
      <SearchInput type="text" placeholder="Search notes..." />
    </StyledHeader>
  );
};

export default Header;
