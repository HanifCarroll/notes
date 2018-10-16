import React from "react";

function NoteContent(props) {
  return (
    <div className={props.containerClassName} onClick={props.onClick}>
      <p className={props.contentClassName}>{props.content}</p>
    </div>
  );
}

export default NoteContent;
