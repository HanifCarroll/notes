import Fuse from "fuse.js";

export const getSearchableEntities = notes => {
  // Create a new Fuse object (search filter) with the corresponding options, then return
  // the Fuse object to be used in searching.

  const options = {
    findAllMatches: false,
    keys: ["title", "content"],
    matchAllTokens: true,
    tokenize: true
  };

  return new Fuse(notes, options);
};
