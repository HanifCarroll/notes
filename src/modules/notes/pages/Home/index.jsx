import React from "react";
import { Modal, Header } from "elements";
import { Notes, Editable } from "modules/notes";
import * as actions from "modules/notes";
import { getNote } from "./helpers";
import styles from "./styles.module.scss";

export class NotesContainer extends React.Component {
  state = { noteId: null };

  onEdit = noteId => {
    this.setState({ noteId });
  };

  onSave = note => {
    // Passed from Search component, which get them from DataLinker
    const { notes, syncStore } = this.props;

    // If it's a new note, run onCreate and pass in new note.
    if (note.id === "new") {
      const nextNotes = actions.onCreate(notes, note);
      return syncStore(nextNotes);
    }

    // Else, save the edited note.
    return syncStore(actions.onUpdate(notes, note));
  };

  onDelete = noteId => {
    const { notes, syncStore } = this.props;
    const nextNotes = actions.onDelete(notes, { id: noteId });

    syncStore(nextNotes);
  };

  onClose = () => {
    // No noteId, so the modal disappears.
    this.setState({ noteId: null });
  };

  renderHeader = () => {
    // From Search component
    const { query, onSearch } = this.props;

    return (
      <Header search={query} onSearch={onSearch}>
        {this.renderNew()}
      </Header>
    );
  };

  renderNew = () => {
    return (
      <button className={"new-note"} onClick={this.onEdit.bind(this, "new")}>
        NEW
      </button>
    );
  };

  renderNotes = () => {
    // From Search component
    const { notes } = this.props;

    return (
      <Notes notes={notes} onDelete={this.onDelete} onEdit={this.onEdit} />
    );
  };

  renderModal = () => {
    const { noteId } = this.state;
    const { notes } = this.props;
    const { id, title, content } = getNote(notes, noteId);

    return (
      <Modal
        open={!!noteId}
        onClose={this.onClose}
        classNames={{ modal: styles.modal, overlay: styles.overlay }}
      >
        <Editable
          id={id}
          title={title}
          content={content}
          onSave={this.onSave}
        />
      </Modal>
    );
  };

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.renderNotes()}
        {this.renderModal()}
      </div>
    );
  }
}
