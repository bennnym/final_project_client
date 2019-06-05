import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import _ from 'underscore';
import faker from 'faker';

const ProfileDisplay = (props) => {
  const { id, auction_duration, bids, cv, email, first_name, last_name, gpa, reserve_price, university } = props.data
  const [ lastPrice, setLastPrice ] = useState('');


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
     
      if (bidAmounts.length > 1) { 
        return formatNumber(bidAmounts[1]) 
      } 
    } 
    return formatNumber(reserve_price)
  }

  const getTopPrice = ( arr ) => {
    if ( bids.length > 0 ){
      return formatNumber(bids[0].amount);
    }

    return formatNumber(reserve_price);
  }

  return(
    
  <div>
    <h1 className="profile-name">{ first_name} {last_name }</h1>
      <div className="pricing">
        {bids ? <div className="price-display"><span className="text-col">Last price:</span> <span className="last-price price ">${getLastPrice(bids)}</span></div> : '' }
        {bids ? <div className="price-display"><span className="text-col">Price now:</span><span className="price-now price">${getTopPrice(bids)}</span></div> : ''   }
        <div className="price-display buttons">
          <Button>Make An Offer</Button>
        </div>
        <div className="price-display buttons">
          <Button variant="danger">Add to watchlist</Button>
        </div>

      </div>
    </div>
  );
}

export default ProfileDisplay;