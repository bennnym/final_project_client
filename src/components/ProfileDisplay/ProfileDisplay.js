import React, { useEffect, useState } from 'react'
import _ from 'underscore';

const ProfileDisplay = (props) => {
  const { id, auction_duration, bids, cv, email, first_name, last_name, gpa, reserve_price, university } = props.data
  const [ lastPrice, setLastPrice ] = useState('')

  const formatNumber = num => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } //formats with commas
    else {
      return "";
    }
  };



  const getLastPrice = ( arr ) => {
    if ( bids.length > 1 ){
     let bidAmounts = _.pluck( arr, 'amount');
     bidAmounts = new Set(bidAmounts); // removes duplicates
     bidAmounts = Array.from(bidAmounts) // converts back to a set so I can get second best price
     
     return formatNumber(bidAmounts[1])

    } else { return formatNumber(reserve_price)}
  }

  return(
    
  <div>
    <h1 className="profile-name">{ first_name} {last_name }</h1>
      <div className="container">
        {bids ? <p >Last Price: <span className="last-price">${getLastPrice(bids)}</span></p> : '' }
      </div>
    </div>
  );
}

export default ProfileDisplay;