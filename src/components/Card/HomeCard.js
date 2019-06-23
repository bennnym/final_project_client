import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./GradCard.css";
import moment from "moment";
import LoginForm from "../LoginModal/LoginForm";
import QuickOfferModal from "../QuickOfferModal/QuickOfferModal";
import { Link } from "react-router-dom";
import datehelper from "../../helper/datehelper";

const HomeCard = props => {
  const {
    id,
    first_name,
    last_name,
    reserve_price,
    profile_photo,
    university,
    auction_duration,
    bids
  } = props.data;
  const [modalShow, setModalShow] = useState(false);

  const [hour, setHours] = useState("");
  const [minute, setMinutes] = useState("");
  const [second, setSeconds] = useState("");

  useEffect(() => {
    setInterval(() => {
      let timeNow = moment.utc();
      let auctionEnd = moment(auction_duration);
      let milliseconds = auctionEnd.diff(timeNow);
      const dif = datehelper(milliseconds, "total_hours");

      // set state
      const { d, h, m, s } = dif;
      // setDays(days)
      setHours(h + d * 24);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
  }, []);

  const formatNumber = num => {
    //formats with commas
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <Card id="card-properties" className="mx-auto card-display">
      <Link
        to={{
          pathname: `/profile/${id}`,
          state: {
            id: id
          }
        }}
      >
        <div
          id="profile-image-home"
          style={{ backgroundImage: `url(${profile_photo})` }}
        ></div>
        {/* <Card.Img id="card-image" variant="top" src={_imageAspect(profile_photo)} /> */}
      </Link>

      <Card.Body className="home-card-body">
        <Card.Title>
          {first_name} {last_name}
        </Card.Title>
        <Card.Text> {university}</Card.Text>
        <Card.Text>
          {" "}
          <strong>
            ${formatNumber(bids.length > 0 ? bids[0].amount : reserve_price)}
          </strong>
        </Card.Text>
        <Card.Text id="timer">
          {hour}h {minute}m left{" "}
        </Card.Text>
        <Card.Text>Offers: {bids.length} </Card.Text>
        <Button
          id="home-button"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Make an Offer
        </Button>

        <QuickOfferModal
          show={modalShow}
          studentID={id}
          onHide={() => setModalShow(false)}
          form={<LoginForm />}
          renderCards={props.render}
          bids={bids}
          reservePrice={reserve_price}
        />
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
