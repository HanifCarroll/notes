import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

const StyledContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  margin: 0 10px 20px 10px;
  padding: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ButtonDiv = styled.div``;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const EditTitleInput = styled.input`
  margin-bottom: 15px;
  width: 100%;
`;

const NoteContentContainer = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  min-height: 60px;
  max-height: 400px;
  margin-bottom: 30px;
`;

const NoteContent = styled.p`
  white-space: pre-line;
`;

const NoteTitle = styled.h3`
  margin-bottom: 15px;
`;

const EditTextAreaStyle = {
  resize: "none",
  width: "100%"
};

class Note extends React.Component {
  state = {
    edit: false,
    title: "",
    content: "",
    id: ""
  };

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      title: this.props.note.title,
      content: this.props.note.content,
      id: this.props.note.id
    });
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.edit) this.onEditSave();
    }
  };

  onEditPress = () => {
    this.setState({
      edit: true,
      title: this.props.note.title,
      content: this.props.note.content,
      id: this.props.note.id
    });
  };

  onInputChange = (propertyName, value) => () => ({
    [propertyName]: value
  });

  onEditSave = () => {
    const { id, content, title } = this.state;
    this.props.onEditSave({ id, title, content });
    this.setState({ edit: false });
  };

  editSaveClickHandler = e => {
    // Place click handler on note, so that if user is editing a note and clicks outside
    // of the inputs, the note saves.
    const { type, tagName } = e.target;
    console.log(e["button"]);

    // When creating a new note, if we click from one input to another, don't save.
    if (type === "text" || type === "textarea") return;
    if (tagName === "H3" || tagName === "P") return;

    // Auto save note when we click outside of inputs.
    if (tagName === "DIV") {
      this.onEditSave();
    }
  };

  renderNoteTitle = () => {
    if (this.state.edit) {
      return (
        <EditTitleInput
          type="text"
          value={this.state.title}
          onChange={e =>
            this.setState(this.onInputChange("title", e.target.value))
          }
        />
      );
    }
    return (
      <NoteTitle onClick={this.onEditPress}>{this.props.note.title}</NoteTitle>
    );
  };

  renderNoteContent = () => {
    if (this.state.edit) {
      return (
        <TextareaAutosize
          style={EditTextAreaStyle}
          onChange={e =>
            this.setState(this.onInputChange("content", e.target.value))
          }
          value={this.state.content}
        />
      );
    }
    return (
      <NoteContentContainer onClick={this.onEditPress}>
        <NoteContent>{this.props.note.content}</NoteContent>
      </NoteContentContainer>
    );
  };

  renderEditButton = () => {
    if (this.state.edit) {
      return <EditButton onClick={this.onEditSave}>Save</EditButton>;
    }
    return <EditButton onClick={this.onEditPress}>Edit</EditButton>;
  };

  renderDeleteButton = () => {
    if (this.state.edit) {
      return (
        <DeleteButton onClick={() => this.setState({ edit: false })}>
          Cancel
        </DeleteButton>
      );
    }
    return (
      <DeleteButton onClick={this.props.onDeleteClick}>Delete</DeleteButton>
    );
  };

  // Top level div is needed, because the click handler doesn't work with
  // styled components.
  render() {
    return (
      <div ref={this.setWrapperRef}>
        <StyledContainer onClicka={this.editSaveClickHandler}>
          {this.renderNoteTitle()}
          {this.renderNoteContent()}
          <ButtonDiv>
            {this.renderEditButton()}
            {this.renderDeleteButton()}
          </ButtonDiv>
        </StyledContainer>
      </div>
    );
  }
}

export default Note;
