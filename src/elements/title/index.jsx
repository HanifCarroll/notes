import React from "react";

export const Title = props => {
  return (
    <h3 className={props.titleClassName} onClick={props.onClick}>
      {props.title}
    </h3>
  );
};
