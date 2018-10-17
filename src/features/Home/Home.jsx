import React from "react";
import { compose } from "recompose";

import withNotes from "../../data/withNotes";

import Header from "../Header/Header";
import NewNoteInput from "../NewNotes/NewNoteInput/NewNoteInput";
import NotesList from "../Notes/NotesList/NotesList";

import "./Home.scss";

function Home(props) {
  const { filteredNotes, isNewNote, title, content, search } = props;

  return (
    <div className="App">
      <Header
        search={search}
        onSearchChange={props.onSearchChange}
        onEnterPress={props.onEnterPress}
      />
      <NewNoteInput
        title={title}
        content={content}
        onTitleChange={props.onTitleChange}
        onContentChange={props.onContentChange}
        isNewNote={isNewNote}
        onNewNote={props.onNewNote}
        onNewSave={props.onNewSave}
        onCancelNewNote={props.onCancelNewNote}
      />
      <NotesList
        notes={filteredNotes}
        onDeleteClick={props.onDeleteNote}
        onEditSave={props.onEditSave}
        onShowModal={props.onShowModal}
        onCloseModal={props.onCloseModal}
      />
    </div>
  );
}

export default compose(withNotes)(Home);
