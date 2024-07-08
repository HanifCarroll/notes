import React from "react";
import { Modal, Header } from "../../../../elements";
import { Notes, Editable, NewNoteInput } from "../../features";
import * as actions from "../../../../modules/notes";
import { getNote } from "./helpers";
import styles from "./styles.module.scss";

export class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.editable = React.createRef();

    this.state = { noteId: null };
  }

  onEdit = (noteId, initialClick) => {
    this.setState({ noteId }, () => this.selectFocus(initialClick));
  };

  selectFocus = initialClick => {
    if (initialClick === "title") {
      const { input } = this.editable.current.titleInput.current;
      input.current.focus();
    }

    if (initialClick === "content") {
      const {
        textarea
      } = this.editable.current.contentInput.current.textarea.current;

      textarea.focus();

      // Place cursor at the end.
      const length = textarea.textLength;
      textarea.setSelectionRange(length, length);
    }
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
    this.setState({ noteId: null, initialClick: "" });
  };

  renderHeader = () => {
    // From Search component
    const { query, onSearch } = this.props;

    return <Header search={query} onSearch={onSearch} />;
  };

  renderNewNote = () => {
    return <NewNoteInput onSave={this.onSave} />;
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
          ref={this.editable}
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
        {this.renderNewNote()}
        {this.renderNotes()}
        {this.renderModal()}
      </div>
    );
  }
}
