import React from "react";

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <input type="text" placeholder="Title" ref={this.input} {...this.props} />
    );
  }
}
