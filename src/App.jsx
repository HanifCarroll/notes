import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import short from "short-uuid";

import Header from "./components/Header";
import NotesList from "./components/NotesList";

const MainDiv = styled.div``;
injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #E8E8E8;
  }
`;

class App extends Component {
  state = {
    notes: [
      { id: 1, title: "Test 1", content: "Test 1 content" },
      { id: 2, title: "Test 2", content: "Test 2 content" },
      { id: 3, title: "Test 3", content: "Test 3 content" },
      { id: 4, title: "Test 4", content: "Test 4 content" }
    ],
    title: "",
    content: "",
    newNote: false
  };

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onNewSave = () => {
    if (this.state.title || this.state.content) {
      this.setState({
        notes: [
          ...this.state.notes,
          {
            title: this.state.title,
            content: this.state.content,
            id: short.uuid()
          }
        ],
        title: "",
        content: "",
        newNote: false
      });
    }
  };

  onEditSave = note => {
    const notes = this.state.notes;
    const oldNote = notes.find(old => old.id === note.id);

    oldNote.title = note.title;
    oldNote.content = note.content;

    this.setState({ notes });
  };

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  onNewNote = () => {
    if (!this.state.newNote) this.setState({ newNote: true });
  };

  saveNoteClickHandler = e => {
    const { newNote, title, content } = this.state;
    const { type } = e.target;

    if (newNote) {
      // When creating a new note, if we click from one input to another, don't save.
      if (type === "text" || type === "textarea") return;

      // If there isn't anything in the title or content, cancel the new note.
      if (!title.length && !content.length) this.setState({ newNote: false });

      // Auto save note when we click outside of inputs.
      if (type === undefined) {
        this.onNewSave();
      }
    }
  };

  render() {
    const { title, content, notes } = this.state;

    return (
      <div className="App" onClick={e => this.saveNoteClickHandler(e)}>
        <MainDiv>
          <Header
            title={title}
            content={content}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
            onNewSave={this.onNewSave}
            newNote={this.state.newNote}
            onNewNote={this.onNewNote}
          />
          <NotesList
            notes={notes}
            onDeleteClick={this.deleteNote}
            onEditSave={this.onEditSave}
          />
        </MainDiv>
      </div>
    );
  }
}

export default App;
