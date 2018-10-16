import React, { Component } from "react";
import Fuse from "fuse.js";

import NewNote from "./NewNote";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredNotes: [],
      fuseFilter: null,
      search: ""
    };
  }

  componentDidMount() {
    this.setState({
      filteredNotes: this.props.notes,
      fuseFilter: this.fuseFilter(this.props.notes)
    });
  }

  fuseFilter = notesArray => {
    // Create a new Fuse object (search filter) with the corresponding options, then return
    // the Fuse object to be used in searching.

    const options = {
      findAllMatches: false,
      keys: ["title", "content"],
      matchAllTokens: true,
      tokenize: true
    };

    return new Fuse(notesArray, options);
  };
  onSearchChange = e => this.setState({ search: e.target.value });

  onSearchNotes = () => {
    // Show view with filtered notes if there's a search term.
    const { search, fuseFilter } = this.state;
    if (search.length) {
      return this.setState({
        filteredNotes: fuseFilter.search(search)
      });
    }

    // If there isn't a search term, then reset the filteredNotes to show all notes.
    this.setState({ filteredNotes: this.state.notes });
  };

  onEnterPress = e => {
    // Execute onSearchNotes on enter key press.
    if (e.keyCode === 13) {
      this.onSearchNotes();
    }
  };
  render() {
    return (
      <NewNote
        search={this.state.search}
        filteredNotes={this.props.notes}
        onSearchChange={this.onSearchChange}
        onSearch={this.onEnterPress}
        onEnterPress={this.onEnterPress}
        {...this.props}
      />
    );
  }
}
