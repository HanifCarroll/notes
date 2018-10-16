import React from "react";
import { Popconfirm, Icon } from "antd";

function DeleteIcon(props) {
  return (
    <Popconfirm
      title="Are you sure you want to delete this note?"
      onConfirm={props.onConfirm}
      okText="Yes"
      cancelText="No"
    >
      <Icon type="delete" theme="outlined" className={props.iconClassName} />
    </Popconfirm>
  );
}

export default DeleteIcon;
