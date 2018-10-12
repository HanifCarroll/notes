import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #b3ccff;
  padding: 1%;
  display: flex;
  justify-content: center;
`;

const StyledLogo = styled.h1`
  text-align: right;
  width: 20%;
  margin-left: 5%;
`;

const SearchInput = styled.input`
  margin: auto 15% auto 5%;
  width: 80%;
  font-size: 16px;
  padding: 7px;
`;

const Header = props => {
  const { search, onSearchChange, onEnterPress } = props;
  return (
    <StyledHeader>
      <StyledLogo>Notes</StyledLogo>
      <SearchInput
        type="search"
        placeholder="Search notes..."
        value={search}
        onChange={e => onSearchChange(e)}
        onKeyDown={e => onEnterPress(e)}
      />
    </StyledHeader>
  );
};

export default Header;
