import React from 'react'
import { Modal } from 'react-bootstrap';

const ModalView = (props) => {
  const { bodyParagraph, title, bodyHeader, changeClass, ref } = props
  return(
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      
      {title ? <Modal.Header closeButton><Modal.Title id='contained-modal-title-vcenter'>
          {title}
      </Modal.Title></Modal.Header> : <></>}

      
      <Modal.Body className={changeClass}>
        {bodyHeader ? bodyHeader : <></>}
        <p>{bodyParagraph}</p>
      </Modal.Body>
    </Modal>
  );
}

export default ModalView;