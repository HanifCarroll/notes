import React from "react";
import { Icon } from "antd";

export const EditButton = props => {
  return (
    <button className={props.buttonClassName} onClick={props.onClick}>
      <Icon className={props.iconClassName} type="edit" theme="outlined" />
    </button>
  );
};
