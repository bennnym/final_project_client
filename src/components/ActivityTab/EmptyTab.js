import React from "react";
import { Link } from "react-router-dom";
import "./ActivityTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmptyTab = () => {
  return (
    <React.Fragment>
      <div className="tab-card empty">
        <h1>Wow, such empty</h1>
        <FontAwesomeIcon className="fa-5x" icon="snowman" />
        <p>
          Go and make your first offer <Link to="/auctions">here</Link> and then
          come back and check your account.
        </p>
      </div>
    </React.Fragment>
  );
};

export default EmptyTab;
