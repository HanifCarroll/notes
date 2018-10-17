import React from "react";
import styles from "./styles.module.scss";

export const Header = props => {
  const { search, onSearch, children } = props;
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Notes</h1>
      <input
        className={styles.search}
        type="search"
        placeholder="Search notes..."
        value={search}
        onChange={onSearch}
      />
      {children}
    </header>
  );
};
