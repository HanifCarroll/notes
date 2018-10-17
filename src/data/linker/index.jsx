import React from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "./helper";

export class DataLinker extends React.Component {
  state = { data: [] };

  componentDidMount() {
    const { storeKey } = this.props;

    return loadFromLocalStorage(storeKey)
      .then(data => this.setState({ data }))
      .catch(e => console.log(e));
  }

  // This function is called when the notes array is changed (note create, update, destroy).
  // After
  syncStore = data => {
    const { storeKey } = this.props;

    saveToLocalStorage(storeKey, data)
      .then(data => this.setState({ data }))
      .catch(e => console.log(e));
  };

  render() {
    const { data } = this.state;
    const { children: render } = this.props;

    // Children is the function pulls of data and syncStore and renders the Search component.
    // Search component receives data (notes) as props.
    // syncStore is passed to the component that Search renders as props, NotesContainer.
    return render({ data, syncStore: this.syncStore });
  }
}
