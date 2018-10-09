import React, { Component } from "react";
import styled from "styled-components";
import short from "short-uuid";

import Header from "./components/Header";
import NotesList from "./components/NotesList";

const MainDiv = styled.div`
  color: red;
`;

class App extends Component {
  state = {
    notes: [],
    title: "",
    content: ""
  };

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onNewSave = newNote => {
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
  };

  removeNote = noteId => {
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
          <NotesList notes={notes} />
        </MainDiv>
      </div>
    );
  }
}

export default App;
