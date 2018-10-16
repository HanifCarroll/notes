import React from "react";
import Modal from "react-responsive-modal";

function MyModal(props) {
  return <Modal showCloseIcon={false} animationDuration={300} {...props} />;
}

export default MyModal;
