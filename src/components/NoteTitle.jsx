import React from "react";

function NoteTitle(props) {
  return (
    <h3 className={props.titleClassName} onClick={props.onClick}>
      {props.title}
    </h3>
  );
}

export default NoteTitle;
