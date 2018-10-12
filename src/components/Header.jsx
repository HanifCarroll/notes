import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 1%;
  display: flex;
  justify-content: center;
`;

const StyledLogo = styled.h1`
  text-align: right;
  width: 25%;
`;

const SearchInput = styled.input`
  margin: auto 5%;
  width: 55%;
  font-size: 20px;
`;

const SearchButton = styled.button`
  width: 20%;
`;

const Header = props => {
  const { search, onSearch, onSearchChange, onEnterPress } = props;
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
      <SearchButton onClick={() => onSearch(search)}>Search</SearchButton>
    </StyledHeader>
  );
};

export default Header;
