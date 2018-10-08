import React, { Component } from "react";
import styled from "styled-components";

import Title from "./components/Title";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

const MainDiv = styled.div`
  color: red;
`;

class App extends Component {
  state = {
    notes: [],
    title: "",
    content: ""
  };

  onTitleChange = e => this.setState({ title: e.target.value });

  onContentChange = e => this.setState({ content: e.target.value });

  onSaveClick = e =>
    this.setState({
      notes: [
        ...this.state.notes,
        { title: this.state.title, content: this.state.content }
      ],
      title: "",
      content: ""
    });

  render() {
    const { title, content, notes } = this.state;

    return (
      <div className="App">
        <Sidebar notes={notes} />
        <MainDiv>
          <Title onTitleChange={this.onTitleChange} title={title} />
          <Editor
            onContentChange={this.onContentChange}
            onSaveClick={this.onSaveClick}
            content={content}
          />
        </MainDiv>
      </div>
    );
  }
}

export default App;
