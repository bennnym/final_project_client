import React, { useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Alert
} from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import "./QuickOfferModal.css";
import links from "../../links";
import ModalView from "./ModalView";

const QuickOfferModal = props => {
  const [bidAmount, setBidAmount] = useState("");
  const [highBid, setHighBid] = useState("");
  const { bids, reservePrice, renderCards, onHide, form, show } = props;

  const _hideHandler = () => {
    setHighBid("");
    onHide();
  };

  const _bidAgain = () => {
    setHighBid("");
  };

  const _getBidAmt = event => {
    setBidAmount(event.target.value);
  };

  const _handleEnter = e => {
    if (e.key === "Enter") {
      makeBid();
    }
  };

  const makeBid = () => {
    if (!bidAmount) {
      return;
    }

    const requestData = {
      student_id: props.studentID,
      employer_email: localStorage.email,
      bid_amount: bidAmount
    };

    axios.post(links.root + "students/bid", requestData).then(res => {
      if (res.status === 200) {
        if (bids.length > 0) {
          let comparisonPrice = reservePrice > bids[0].amount ? reservePrice : bids[0].amount
          var high = +bidAmount > comparisonPrice ? true : false;
          setHighBid(high);
        } else if (reservePrice) {
          high = +bidAmount > reservePrice ? true : false;
          setHighBid(high);
        }

        renderCards();
        // renders the updated prices
      }
    });
  };

  if (highBid === false) {
    return (
      <ModalView
        className="bid-success"
        show={show}
        onHide={_hideHandler}
        bodyParagraph={
          <Alert variant="danger">
            <Alert.Heading>Sorry, Your Offer Wasn't High Enough</Alert.Heading>
            <Button
              onClick={_bidAgain}
              className="offer-final"
              variant="danger"
            >
              Make Another Offer
            </Button>
          </Alert>
        }
      />
    );
  } else if (highBid === true) {
    return (
      <ModalView
        className="bid-success"
        show={show}
        onHide={_hideHandler}
        bodyParagraph={
          <Alert variant="success">
            <Alert.Heading>You Are The Highest Bidder</Alert.Heading>
            <p>CONGRATULATIONS!</p>
          </Alert>
        }
      />
    );
  } else if (props.employer) {
    return (
      <Modal
        {...props}
        size="lg"
        onHide={_hideHandler}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quick Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup
            onKeyDown={_handleEnter}
            className="mb-3 quick-offer-input"
          >
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={_getBidAmt}
              type="number"
              aria-label="Amount (to the nearest dollar)"
              required="true"
              data-toggle="validator"
            />
          </InputGroup>

          <Form.Group className="quick-offer-input">
            <Form.Check
              className="terms"
              required
              name="terms"
              label="Commit To Offer"
            />
          </Form.Group>
          <Button onClick={makeBid} className="offer-final" variant="danger">
            Employ!
          </Button>
        </Modal.Body>
      </Modal>
    );
  } else if (props.student) {
    return (
      <ModalView
        changeClass="not-loggedin"
        show={show}
        onHide={_hideHandler}
        bodyHeader="Sorry, Students are not permitted to make Offers"
      />
    );
  } else {
    return (
      <ModalView
        show={show}
        onHide={_hideHandler}
        title="Quick Offer"
        bodyHeader="You Must Be Logged in To Make an Offer"
        bodyParagraph={form}
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    employer: state.employer,
    student: state.student,
    highBid: state.highBid
  };
};

export default connect(mapStateToProps)(QuickOfferModal);
