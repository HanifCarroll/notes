import React from "react";
import { DataLinker } from "../../../data";
import { Search } from "../../../utils";
import { NotesContainer } from "../pages";

export class NotesModule extends React.Component {
  render() {
    return (
      // DataLinker calls the function below and passes its own 'data' and 'syncStore'
      // as an argument to this function.
      <DataLinker storeKey="notes">
        {({ data, syncStore }) => (
          // The function then passes on 'data' (the notes) to the Search component.
          <Search data={data}>
            {({ query, matches, onSearch }) => (
              // Search component calls this function and passes in 'query', 'matches', and
              // 'onSearch' as arguments.
              // This function renders the NotesContainer, and passes in
              // 'query', 'notes', and 'onSearch' provided by Search component
              // and also passes in 'syncStore' provided by DataLinker.
              <NotesContainer
                query={query}
                notes={matches}
                onSearch={onSearch}
                syncStore={syncStore}
              />
            )}
          </Search>
        )}
      </DataLinker>
    );
  }
}
