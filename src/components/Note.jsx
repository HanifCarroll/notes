import React from "react";
import styled from "styled-components";

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
  max-width: 80%;
`;

const EditTextArea = styled.textarea`
  max-width: 80%;
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

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
  }

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
    return (
      <NoteTitle onClick={this.onEditPress}>{this.props.note.title}</NoteTitle>
    );
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
    return (
      <NoteContentContainer>
        <NoteContent onClick={this.onEditPress}>
          {this.props.note.content}
        </NoteContent>
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
