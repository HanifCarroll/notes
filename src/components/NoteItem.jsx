import React from "react";

const NoteItem = props => {
  return (
    <div>
      <p>
        {props.note.title} - {props.note.content}
      </p>
    </div>
  );
};

export default NoteItem;
