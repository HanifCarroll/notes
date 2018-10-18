import React from "react";
import TextareaAutosize from "react-autosize-textarea";

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.textarea = React.createRef();
  }

  render() {
    return <TextareaAutosize {...this.props} ref={this.textarea} />;
  }
}
