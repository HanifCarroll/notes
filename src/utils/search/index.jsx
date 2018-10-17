import React from "react";
import { getSearchableEntities } from "./helper";

export class Search extends React.Component {
  state = { query: "" };

  static getDerivedStateFromProps(props) {
    // Search is rendered as a child of DataLinker and receives prop 'data', the notes array.
    const { data } = props;

    // Queryable is a Fuse filter containing the notes array.  It is remade when new data
    // comes in as a prop.
    const queryable = getSearchableEntities(data);

    // Now we have the query and the filter on our component state.
    return { queryable };
  }

  onSearchChange = e => this.setState({ query: e.target.value });

  render() {
    const { query, queryable } = this.state;

    // Rename props.children to render for readability.
    const { children: render, data } = this.props;

    // Determine which notes will be sent down to NotesContainer.
    const filtered = query ? queryable.search(query) : data;

    // Call the function passed in as child with query, filteredNotes, and onSearchChange
    // as props.
    return render({ query, matches: filtered, onSearch: this.onSearchChange });
  }
}
