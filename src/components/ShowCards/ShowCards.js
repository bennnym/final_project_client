import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import headshot from '../../assets/img/SEI_Ben.jpg'
import SingleCard from './SingleCard'
import axios from 'axios';
import links from '../../links'


const ShowCards = () => {
  const [ gradData, setGradData ] = useState([])

  useEffect(() => {
    axios
      .get(links.root + 'students')
      .then( res => {
        setGradData(res.data)
      })
  }, [])

  return(
  <CardGroup >
       
       { gradData ? gradData.map( grads => {
         const { id, first_name, last_name, university, profile_photo, reserve_price, auction_duration } = grads
         return (
           <SingleCard
             image={profile_photo}
             timeLeft={ auction_duration}
             price={reserve_price}
             firstName={first_name}
             lastName={last_name}
             university={university}
           />
         )

       }) : '' }
    <SingleCard 
      image={headshot}
    />

  </CardGroup>
 );
}

export default ShowCards;