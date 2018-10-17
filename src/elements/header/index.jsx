import React from "react";

import styles from "./styles.module.scss";

export const Header = props => {
  const { search, onSearchChange, onEnterPress } = props;
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Notes</h1>
      <input
        className={styles.search}
        type="search"
        placeholder="Search notes..."
        value={search}
        onChange={e => onSearchChange(e)}
        onKeyDown={e => onEnterPress(e)}
      />
    </header>
  );
};
