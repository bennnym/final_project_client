import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./ActivityTab.css";
import { Link } from "react-router-dom";

const TabCard = props => {
  const {
    date,
    bidAmount,
    profilePhoto,
    firstName,
    lastName,
    university,
    email,
    status,
    salePrice,
    studentID,
    bidCount,
    list
  } = props;

  return (
    <Card responsive="true" className="tab-card">
      <Card.Body className="tab-card-body">
        <Row className="upper-row">
          <Col xs={8}>
            <span className="tab-spans">
              {list ? "AUCTION END" : "OFFER DATE"}
            </span>
            <div className="tab-small-headings">{date}</div>
          </Col>
          <Col xs={4}>
            <span className="tab-spans">
              {list ? "TOP OFFER" : "OFFER AMOUNT"}
            </span>
            <div className="tab-small-headings">${bidAmount}</div>
          </Col>
        </Row>

        <Row className="offer-card">
          <Col className="offer-image mx-auto" xs={2}>
            <div
              style={{ backgroundImage: `url(${profilePhoto})` }}
              className="w-100 mx-auto		 offer-card-image"
            ></div>
          </Col>
          <Col className="middle-box" xs={6}>
            <span className="tab-spans header">
              {firstName} {lastName}
            </span>
            <div>{university}</div>
            <div>{email}</div>
          </Col>
          <Col className="right-box" xs={4}>
            <div>
              Status: <span className={status}>{status}</span>
            </div>
            <div>Offers: {bidCount}</div>
            {salePrice && !list ? (
              <div>
                Sale Price:{" "}
                <span className="tab-small-headings">${salePrice}</span>{" "}
              </div>
            ) : list ? (
              <div>
                Reserve Price:{" "}
                <span className="tab-small-headings">${salePrice}</span>{" "}
              </div>
            ) : (
              <></>
            )}
            {status === "live" ? (
              <div>
                <Link
                  to={{
                    pathname: `/profile/${studentID}`,
                    state: {
                      id: studentID
                    }
                  }}
                >
                  {firstName}'s Profile
                </Link>
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TabCard;
