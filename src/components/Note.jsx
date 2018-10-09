import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 20%;
  height: 200px;
  border: 2px solid black;
  overflow-y: auto;
  padding: 0 2%;
`;

const ButtonDiv = styled.div``;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const EditTitleInput = styled.input``;

const EditTextArea = styled.textarea``;

class Note extends React.Component {
  state = {
    edit: false,
    title: "",
    content: "",
    id: ""
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
    return <h3>{this.props.note.title}</h3>;
  };

  renderNoteContent = () => {
    if (this.state.edit) {
      return (
        <EditTextArea
          onChange={e =>
            this.setState(this.onInputChange("content", e.target.value))
          }
          value={this.state.content}
        />
      );
    }
    return <p>{this.props.note.content}</p>;
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

  renderButtons = () => {
    return this.renderEditButton() && this.renderDeleteButton();
  };

  render() {
    return (
      <StyledContainer>
        {this.renderNoteTitle()}
        {this.renderNoteContent()}
        <ButtonDiv>
          {this.renderEditButton()}
          {this.renderDeleteButton()}
        </ButtonDiv>
      </StyledContainer>
    );
  }
}

export default Note;
