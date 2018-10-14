import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { Popconfirm, message, Icon } from "antd";

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

const EditIconStyle = {
  fontSize: "17px"
};

const DeleteIconStyle = {
  fontSize: "17px",
  marginRight: "10px"
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

  onDeleteClick = () => {
    this.props.onDeleteClick();
    message.success("Note deleted", 1.5);
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
          <Icon type="check" theme="outlined" style={EditIconStyle} />
        </EditButton>
      );
    }
    return (
      <EditButton onClick={this.onEditPress}>
        <Icon type="edit" theme="outlined" style={EditIconStyle} />
      </EditButton>
    );
  };

  renderDeleteButton = () => {
    if (this.state.edit) {
      return (
        <DeleteButton onClick={() => this.setState({ edit: false })}>
          <Icon type="close" theme="outlined" style={DeleteIconStyle} />
        </DeleteButton>
      );
    }
    return (
      <Popconfirm
        title="Are you sure you want to delete this note?"
        onConfirm={this.onDeleteClick}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="delete" theme="outlined" style={DeleteIconStyle} />
      </Popconfirm>
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
            {this.renderDeleteButton()}
            {this.renderEditButton()}
          </ButtonDiv>
        </StyledContainer>
      </div>
    );
  }
}

export default Note;
