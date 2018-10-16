import React, { Component } from "react";
import Home from "./Home";

export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isNewNote: false
    };
  }

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onNewNote = () => {
    // Switch to show hidden title bar when user clicks input for new note content.
    if (!this.state.isNewNote) this.setState({ isNewNote: true });
  };

  onCancelNewNote = () => {
    this.setState({ isNewNote: false });
  };

  render() {
    return (
      <Home
        title={this.state.title}
        content={this.state.content}
        isNewNote={this.state.isNewNote}
        onTitleChange={this.onTitleChange}
        onContentChange={this.onContentChange}
        onNewNote={this.onNewNote}
        onCancelNewNote={this.onCancelNewNote}
        {...this.props}
      />
    );
  }
}
