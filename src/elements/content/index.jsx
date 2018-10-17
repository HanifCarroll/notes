import React from "react";

export const Content = props => {
  return (
    <div className={props.containerClassName} onClick={props.onClick}>
      <p className={props.contentClassName}>{props.content}</p>
    </div>
  );
};
