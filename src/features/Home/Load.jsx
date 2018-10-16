import React from "react";
import short from "short-uuid";

import Search from "./Search";

export default class Load extends React.Component {
  state = { notes: [] };

  async componentDidMount() {
    await this.loadFromLocalStorage();
  }

  onNewSave = ({ title, content }) => {
    // Executed when a new note is entered from the 'new note input' up top.

    // if (this.state.title || this.state.content) {
    // Add new note to notes array, and update the fuse search to include it.
    const newNotes = [
      ...this.state.notes,
      {
        title,
        content,
        id: short.uuid()
      }
    ];

    this.setState(
      {
        notes: newNotes
      },
      () => this.saveToLocalStorage()
    );
    // }
  };

  onEditSave = note => {
    // Executed when saving an edited note.

    const { notes } = this.state;
    const newNotes = notes.map(
      currentNote => (currentNote.id === note.id ? note : currentNote)
    );

    // Replace old notes array with array containing edited notes, then update the fuse search.
    this.setState({ notes: newNotes }, () => {
      this.saveToLocalStorage();
    });
  };

  onDeleteNote = noteId => {
    const { notes } = this.state;

    // Remove the note from both arrays.
    this.setState(
      {
        notes: notes.filter(note => note.id !== noteId)
      },
      () => this.saveToLocalStorage()
    );
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

  saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };

  render() {
    const { notes } = this.state;
    return (
      <div>
        <Search
          notes={notes}
          onNewSave={this.onNewSave}
          onEditSave={this.onEditSave}
          onDeleteNote={this.onDeleteNote}
        />
      </div>
    );
  }
}
