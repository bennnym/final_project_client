import React, { useState } from "react";
import { Button } from "react-bootstrap";
import QuickOfferModal from "../QuickOfferModal/QuickOfferModal";
import LoginForm from "../LoginModal/LoginForm";
import _ from "underscore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfileDisplay.css";
import links from "../../links";
import { connect } from "react-redux";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

const ProfileDisplay = props => {
  const [modalShow, setModalShow] = useState(false);

  const {
    id,
    auction_duration,
    bids,
    first_name,
    last_name,
    reserve_price,
    watchlists
  } = props.data;

  if (moment().utc() > moment(auction_duration)) {
    return <Redirect to="/auctions" />;
  }

  const formatNumber = num => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } //formats with commas
    else {
      return "";
    }
  };

  const renderWatching = () => {
    let watching = _.findWhere(watchlists, {
      employer_email: localStorage.email
    });

    if (watching === undefined) {
      return (
        <Button onClick={_updateWatchlist} variant="outline-danger">
          Add To Watchlist{" "}
          <FontAwesomeIcon
            className="heart"
            style={{ color: "#fff" }}
            icon="heart"
          />
        </Button>
      );
    } else {
      return (
        <Button onClick={_updateWatchlist} variant="outline-danger">
          Add To Watchlist{" "}
          <FontAwesomeIcon
            className="heart"
            style={{ color: "#dc3545" }}
            icon="heart"
          />
        </Button>
      );
    }
  };

  const _updateWatchlist = () => {
    axios
      .post(links.root + `watchlist/${id}`, {
        employer_email: localStorage.email
      })
      .then(res => {
        if (res.status === 204) {
          props.renderProfile();
        }
      });
  };

  const getLastPrice = arr => {
    if (bids.length > 1) {
      let bidAmounts = _.pluck(arr, "amount");
      bidAmounts = new Set(bidAmounts); // removes duplicates
      bidAmounts = Array.from(bidAmounts); // converts back to a set so I can get second best price

      if (bidAmounts.length > 1) {
        return formatNumber(bidAmounts[1]);
      }
    }
    return formatNumber(reserve_price);
  };

  const getTopPrice = arr => {
    if (bids.length > 0) {
      return formatNumber(bids[0].amount);
    }

    return formatNumber(reserve_price);
  };

  const getTopOffer = arr => {
    if (bids.length > 0) {
      return bids[0].company;
    }

    return "No Offers Yet";
  };
  const getBids = arr => {
    if (bids.length > 0) {
      return bids.length;
    }

    return "0";
  };

  return (
    <div>
      <h1 className="profile-name">
        {first_name} {last_name}
      </h1>

      <div className="pricing">
        <div className="pricing-col-one">
          {bids ? (
            <div className="price-display">
              <div className="text-col">Last price:</div>{" "}
              <span className="last-price price ">${getLastPrice(bids)}</span>
            </div>
          ) : (
            ""
          )}
          {bids ? (
            <div className="price-display">
              <div className="text-col">Price now:</div>
              <span className="price-now price">${getTopPrice(bids)}</span>
            </div>
          ) : (
            ""
          )}
          {bids ? (
            <div className="price-display offer">
              <div className="text-col">Offers:</div>
              <div className="price">{getBids(bids)}</div>
            </div>
          ) : (
            ""
          )}
          {bids ? (
            <div className="price-display offer">
              <div className="text-col">Top Offer:</div>
              <span className="price">{getTopOffer(bids)}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="pricing-col-two">
          <div className="price-display buttons">
            <Button onClick={() => setModalShow(true)}>Make An Offer</Button>
          </div>

          <QuickOfferModal
            show={modalShow}
            studentID={id}
            onHide={() => setModalShow(false)}
            form={<LoginForm />}
            renderCards={props.renderProfile}
            bids={bids}
            reservePrice={reserve_price}
          />

          {props.employer ? (
            <div className="price-display buttons">
              {watchlists ? (
                renderWatching()
              ) : (
                <Button onClick={_updateWatchlist} variant="outline-danger">
                  Add To Watchlist{" "}
                  <FontAwesomeIcon className="heart" icon="heart" />
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="price-display buttons message-button">
            {first_name && props.employer ? (
              <Link
                to={{
                  pathname: `/myacc`,
                  state: {
                    id: id,
                    name: `${first_name} ${last_name}`
                  }
                }}
              >
                <Button variant="warning">{`Message ${first_name}`}</Button>
              </Link>
            ) : !props.employer ? (
              ""
            ) : (
              <Button variant="warning">Message </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    student: state.student,
    employer: state.employer
  };
};

export default connect(mapStateToProps)(ProfileDisplay);
