export const loadFromLocalStorage = storeKey => {
  return new Promise((resolve, reject) => {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(storeKey)) {
      // get the key's value from localStorage
      let loadedNotes = localStorage.getItem(storeKey);

      // parse the localStorage string and setState
      try {
        return resolve(JSON.parse(loadedNotes));
      } catch (e) {
        reject(e);
      }
    }
    resolve();
  });
};

// storeKey is what the notes will be saved undr in locals
export const saveToLocalStorage = (storeKey, notes) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(storeKey, JSON.stringify(notes));
      return resolve(notes);
    } catch (e) {
      reject(e);
    }
  });
};
