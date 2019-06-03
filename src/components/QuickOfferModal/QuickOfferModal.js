import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

const QuickOfferModal = (props) => {

  if ( props.employer ) { 
  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Quick Offer
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Quick Offer</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
          ac consectetur ac, vestibulum at eros.
          </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
} else {
  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quick Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>NOT LOGGED IN</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}


}

const mapStateToProps = (state) => {
  return {
    employer: state.employer
  };
}

export default connect(mapStateToProps)(QuickOfferModal);
