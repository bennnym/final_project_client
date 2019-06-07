import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import SingleCard from './SingleCard'
import axios from 'axios';
import links from '../../links'

const ShowCards = (props) => {
  const { gradData, setGradData } = props

  useEffect(() => {
    renderCards()
  }, [])

  const renderCards = () => {
    axios
      .get(links.root + 'students')
      .then(res => {
        setGradData(res.data)
      })
  }

  return(
  <CardGroup >
       
       { gradData ? gradData.map( grads => {
         const { id, first_name, last_name, university, profile_photo, reserve_price, auction_duration, bids } = grads
         
         if ( bids.length >= 1 ) {
           var topPrice = bids[0].amount > reserve_price ? bids[0].amount : reserve_price
         } else {
            topPrice = reserve_price
         }

         return (
           <SingleCard
             key={id}
             image={profile_photo}
             timeLeft={ auction_duration}
             price={topPrice}
             firstName={first_name}
             lastName={last_name}
             university={university}
             id={id}
             bids={bids}
             renderCards={renderCards}
             reservePrice={reserve_price}
          
           />
         )

       }) : '' }

  </CardGroup>
 );
}

export default ShowCards;