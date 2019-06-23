import React from "react";
import { Modal } from "react-bootstrap";

const LoginModal = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.form}</Modal.Body>
    </Modal>
  );
};

export default LoginModal;
