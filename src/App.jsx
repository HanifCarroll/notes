import React, { Component } from "react";
import styled from "styled-components";
import short from "short-uuid";

import Header from "./components/Header";
import NotesList from "./components/NotesList";

const MainDiv = styled.div``;

class App extends Component {
  state = {
    notes: [
      { id: 1, title: "Test 1", content: "Test 1 content" },
      { id: 2, title: "Test 2", content: "Test 2 content" }
    ],
    title: "",
    content: ""
  };

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onNewSave = newNote => {
    if (this.state.content) {
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
        content: ""
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

  render() {
    const { title, content, notes } = this.state;

    return (
      <div className="App">
        <MainDiv>
          <Header
            title={title}
            content={content}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
            onNewSave={this.onNewSave}
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
