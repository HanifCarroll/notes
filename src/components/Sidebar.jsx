import React from "react";
import styled from "styled-components";

import NoteItem from "./NoteItem";

const styledDiv = styled.div``;

const Sidebar = props => {
  const createNotesList = () =>
    props.notes.map(note => <NoteItem note={note} />);

  return (
    <div>
      <h1>Sidebar</h1>
      <ul>{createNotesList()}</ul>
    </div>
  );
};

export default Sidebar;
