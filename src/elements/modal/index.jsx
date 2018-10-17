import React from "react";
import ResponsiveModal from "react-responsive-modal";

export const Modal = props => {
  return (
    <ResponsiveModal showCloseIcon={false} animationDuration={300} {...props} />
  );
};

export default Modal;
