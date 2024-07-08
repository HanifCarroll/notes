// This component is rendered by NotesContainer, so props are passed from there.

import React from "react";
import { Input, TextArea } from "../../../../elements";
import styles from "./styles.module.scss";

export class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.contentInput = React.createRef();
  }

  state = {
    id: "",
    title: "Title",
    content: "Content"
  };

  static getDerivedStateFromProps(props, state) {
    const { id, title, content } = props;

    // TODO find out what this is for
    if (state.id) {
      return { id, title, content, ...state };
    }

    return { id, title, content };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.onSave();
    }
  };

  onChange = propName => e => this.setState({ [propName]: e.target.value });

  onSave = () => {
    const { id, title, content } = this.state;

    // Calls syncStore from src/data/linker with the onUpdate action as argument.
    // First argument to onUpdate is the notes store, second is the note created above.
    this.props.onSave({ id, title, content });
  };

  render() {
    const { title, content } = this.state;

    return (
      <div ref={node => (this.wrapperRef = node)}>
        <Input
          ref={this.titleInput}
          className={styles["title-input"]}
          placeholder="Title"
          value={title}
          onChange={this.onChange("title")}
        />
        <TextArea
          ref={this.contentInput}
          className={styles["content-input"]}
          placeholder="Note"
          value={content}
          onChange={this.onChange("content")}
        />
      </div>
    );
  }
}
