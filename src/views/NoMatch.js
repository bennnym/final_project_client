import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <h1>
      No Match Go <Link to="/">Home</Link>
    </h1>
  );
};

export default NoMatch;
