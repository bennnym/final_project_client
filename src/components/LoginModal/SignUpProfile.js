import React from "react";
import { Link } from "react-router-dom";
import "./LoginModal.css";

const SignUpProfile = props => {
  const { profilePhoto, reserve, day, hour, minute, second, id } = props;

  const formatNumber = num => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } //formats with commas
    else {
      return "";
    }
  };

  const _imageAspect = imageURL => {
    imageURL = imageURL.split("/");
    imageURL[imageURL.length - 2] = "h_220,w_337,c_fill";
    imageURL = imageURL.join("/");
    return imageURL;
  };

  return (
    <div className="photo-container">
      <div className="show-photo">
        <img
          className="profile-confirm"
          src={_imageAspect(profilePhoto)}
          alt=""
        />
      </div>
      <div className="show-data">
        <div>
          Reserve Salary: <span> ${formatNumber(reserve)}</span>
        </div>
        <div>Time Till Employment: </div>
        <div>
          <span className="time-left">
            {day}d {hour}h {minute}m {second}s
          </span>
        </div>
        <div>
          Bids: <span>0</span>{" "}
        </div>
        <div>
          <Link
            to={{
              pathname: `/profile/${id}`,
              state: {
                id: id
              }
            }}
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpProfile;
