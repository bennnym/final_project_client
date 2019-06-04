import React from 'react'
import { Link } from 'react-router-dom'
import "./LoginModal.css";


const SignUpProfile = (props) => {
  const { profilePhoto, reserve, day, hour, minute, second, id} = props
  return(
    <div className='photo-container'>
      <div className='show-photo'>
        <img className='profile-confirm' src={profilePhoto} alt='' />
      </div>
      <div className='show-data'>
        <ul>
          <li>
            Reserve Salary: <span> ${reserve}</span>
          </li>
          <li>Time Till Employment: </li>
          <li>
            <span className='time-left'>
              {day}d {hour}h {minute}m {second}s
							</span>
          </li>
          <li>
            Bids: <span>0</span>{" "}
          </li>
          <li>
            <Link
              to={{
                pathname: `/profile/${id}`,
                state: {
                  id: id,
                },
              }}>
              Profile
							</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignUpProfile;