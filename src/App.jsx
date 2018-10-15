import React from "react";
import short from "short-uuid";
import Fuse from "fuse.js";

import Header from "./components/Header";
import NewNoteInput from "./components/NewNoteInput";
import NotesList from "./components/NotesList";
import "./App.css";

class App extends React.Component {
  state = {
    notes: [],
    filteredNotes: [],
    fuseFilter: null,
    search: "",
    title: "",
    content: "",
    newNote: false
  };

  componentDidMount = async () => {
    // Put the filter in the state, because it's used throughout
    // the component's lifecycle.
    await this.loadFromLocalStorage();
    this.syncNotesAndFilteredNotes();
  };

  syncNotesAndFilteredNotes = () =>
    this.setState({
      fuseFilter: this.fuseFilter(),
      filteredNotes: this.state.notes
    });

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onSearchChange = e => this.setState({ search: e.target.value });

  onNewSave = () => {
    // Executed when a new note is entered from the 'new note input' up top.

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
          search: "",
          newNote: false
        },
        () => {
          this.setState(
            {
              fuseFilter: this.fuseFilter(),
              filteredNotes: this.state.notes
            },
            () => this.saveToLocalStorage()
          );
        }
      );
    }
  };

  onEditSave = note => {
    // Executed when saving an edited note.

    const notes = this.state.notes;
    const oldNote = notes.find(old => old.id === note.id);

    oldNote.title = note.title;
    oldNote.content = note.content;

    // Replace old notes array with array containing edited notes, then update the fuse search.
    this.setState(
      { notes },
      this.setState(
        {
          fuseFilter: this.fuseFilter()
        },
        () => this.saveToLocalStorage()
      )
    );
  };

  onDeleteNote = noteId => {
    const { notes, filteredNotes } = this.state;

    // Remove the note from both arrays.
    this.setState(
      {
        notes: notes.filter(note => note.id !== noteId),
        filteredNotes: filteredNotes.filter(note => note.id !== noteId)
      },
      () => {
        // Alert fuse filter of updated notes array.
        this.setState({ fuseFilter: this.fuseFilter() }, () =>
          this.saveToLocalStorage()
        );
      }
    );
  };

  onNewNote = () => {
    // Switch to show hidden title bar when user clicks input for new note content.
    if (!this.state.newNote) this.setState({ newNote: true });
  };

  onCancelNewNote = () => {
    this.setState({ newNote: false });
  };

  onSearchNotes = query => {
    // Show view with filtered notes if there's a search term.
    if (this.state.search.length) {
      return this.setState({
        filteredNotes: this.state.fuseFilter.search(query)
      });
    }

    // If there isn't a search term, then reset the filteredNotes to show all notes.
    this.setState({ filteredNotes: this.state.notes });
  };

  onEnterPress = e => {
    // Execute onSearchNotes on enter key press.
    if (e.keyCode === 13) {
      this.onSearchNotes(this.state.search);
    }
  };

  fuseFilter = () => {
    // Create a new Fuse object (search filter) with the corresponding options, then return
    // the Fuse object to be used in searching.

    const options = {
      findAllMatches: false,
      keys: ["title", "content"],
      matchAllTokens: true,
      tokenize: true
    };

    return new Fuse(this.state.notes, options);
  };

  saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };

  loadFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty("notes")) {
        // get the key's value from localStorage
        let loadedNotes = localStorage.getItem("notes");

        // parse the localStorage string and setState
        try {
          loadedNotes = JSON.parse(loadedNotes);
          this.setState({ notes: loadedNotes });
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
      resolve();
    });
  };

  render() {
    const { title, content, search, filteredNotes } = this.state;

    return (
      <div className="App">
        <Header
          search={search}
          onSearchChange={this.onSearchChange}
          onEnterPress={this.onEnterPress}
        />
        <NewNoteInput
          title={title}
          content={content}
          onTitleChange={this.onTitleChange}
          onContentChange={this.onContentChange}
          newNote={this.state.newNote}
          onNewNote={this.onNewNote}
          onNewSave={this.onNewSave}
          onCancelNewNote={this.onCancelNewNote}
        />
        <NotesList
          notes={filteredNotes}
          onDeleteClick={this.onDeleteNote}
          onEditSave={this.onEditSave}
          onShowModal={this.onShowModal}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }
}

export default App;
