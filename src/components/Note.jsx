import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { MdEdit, MdDelete, MdCancel, MdCheckCircle } from "react-icons/md";

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

const ButtonDiv = styled.div`
  text-align: right;
`;

const EditButton = styled.button`
  margin-right: 1px;
  background-color: white;
  border: none;
`;

const DeleteButton = styled.button`
  background-color: white;
  border: none;
`;

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
  word-wrap: break-word;
`;

const NoteTitle = styled.h3`
  margin-bottom: 15px;
`;

const EditTextAreaStyle = {
  resize: "none",
  width: "100%",
  fontSize: "16px"
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
        <NoteContentContainer>
          <TextareaAutosize
            style={EditTextAreaStyle}
            wrap="hard"
            onChange={e =>
              this.setState(this.onInputChange("content", e.target.value))
            }
            value={this.state.content}
          />
        </NoteContentContainer>
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
      return (
        <EditButton onClick={this.onEditSave}>
          <MdCheckCircle size="1.5em" color="#3d3f3d" />
        </EditButton>
      );
    }
    return (
      <EditButton onClick={this.onEditPress}>
        <MdEdit size="1.5em" color="#3d3f3d" />
      </EditButton>
    );
  };

  renderDeleteButton = () => {
    if (this.state.edit) {
      return (
        <DeleteButton onClick={() => this.setState({ edit: false })}>
          <MdCancel size="1.5em" color="#3d3f3d" />
        </DeleteButton>
      );
    }
    return (
      <DeleteButton onClick={this.props.onDeleteClick}>
        <MdDelete size="1.5em" color="#3d3f3d" />
      </DeleteButton>
    );
  };

  // Top level div is needed, because the click handler doesn't work with
  // styled components.
  render() {
    return (
      <div ref={this.setWrapperRef}>
        <StyledContainer>
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
