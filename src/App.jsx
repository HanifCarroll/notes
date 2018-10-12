import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import short from "short-uuid";
import Fuse from "fuse.js";

import Header from "./components/Header";
import NewNoteInput from "./components/NewNoteInput";
import NotesList from "./components/NotesList";

const MainDiv = styled.div``;
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
    filteredNotes: [],
    fuseFilter: null,
    search: "",
    title: "",
    content: "",
    newNote: false
  };

  componentDidMount() {
    // Put the filter in the state, because it's used throughout
    // the component's lifecycle.
    this.setState({
      fuseFilter: this.fuseFilter(),
      filteredNotes: this.state.notes
    });
  }

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onSearchChange = e => this.setState({ search: e.target.value });

  onNewSave = () => {
    if (this.state.title || this.state.content) {
      // Add new note to notes array, and update the fuse search to include it.
      this.setState(
        {
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
        },
        () => this.setState({ fuseFilter: this.fuseFilter() })
      );
    }
  };

  onEditSave = note => {
    const notes = this.state.notes;
    const oldNote = notes.find(old => old.id === note.id);

    oldNote.title = note.title;
    oldNote.content = note.content;

    // Replace old notes array with array containing edited notes, then update the fuse search.
    this.setState(
      { notes },
      this.setState({
        fuseFilter: this.fuseFilter()
      })
    );
  };

  onDeleteNote = noteId => {
    this.setState(
      {
        notes: this.state.notes.filter(note => note.id !== noteId)
      },
      () => this.setState({ fuseFilter: this.fuseFilter() })
    );
  };

  onNewNote = () => {
    if (!this.state.newNote) this.setState({ newNote: true });
  };

  onSearchNotes = query => {
    if (this.state.search.length) {
      return this.setState({
        filteredNotes: this.state.fuseFilter.search(query)
      });
    }

    // If there isn't a query, then reset the filteredNotes to show all notes.
    this.setState({ filteredNotes: this.state.notes });
  };

  onEnterPress = e => {
    // If there's a search term, execute the search.
    if (e.keyCode === 13) {
      this.onSearchNotes(this.state.search);
    }
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

  fuseFilter = () => {
    // Create a new Fuse object with the corresponding options, then return
    // the Fuse object to be used in searching.

    //const attributes = Object.keys(this.state.notes[0]).map(key => String(key));

    const options = {
      findAllMatches: false,
      keys: ["title", "content"],
      matchAllTokens: true,

      tokenize: true
    };

    return new Fuse(this.state.notes, options);
  };

  render() {
    const { title, content, search, filteredNotes } = this.state;

    return (
      <div className="App" onClick={e => this.saveNoteClickHandler(e)}>
        <MainDiv>
          <Header
            search={search}
            onSearch={this.onSearchNotes}
            onSearchChange={this.onSearchChange}
            onEnterPress={this.onEnterPress}
          />
          <NewNoteInput
            title={title}
            content={content}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
            onNewSave={this.onNewSave}
            newNote={this.state.newNote}
            onNewNote={this.onNewNote}
          />
          <NotesList
            notes={filteredNotes}
            onDeleteClick={this.onDeleteNote}
            onEditSave={this.onEditSave}
          />
        </MainDiv>
      </div>
    );
  }
}

export default App;
