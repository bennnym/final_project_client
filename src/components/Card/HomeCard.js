import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './GradCard.css';
import moment from 'moment';

const HomeCard = ( props ) => {
  const { id, first_name, last_name, reserve_price, profile_photo, university, auction_duration, bids } = props.data

  const [day, setDays] = useState('');
  const [hour, setHours] = useState('');
  const [minute, setMinutes] = useState('');
  const [second, setSeconds] = useState('');

  useEffect(() => {
    setInterval(() => {
      let timeNow = moment.utc()
      let auctionEnd = moment(auction_duration)
      let dif = new moment.duration(auctionEnd - timeNow)

      // set state
      const { days, hours, minutes, seconds } = dif._data
      // setDays(days)
      setHours(hours + days * 24 )
      setMinutes(minutes)
      setSeconds(seconds)
    }, 1000)
  }, [])

  const formatNumber = (num) => { //formats with commas
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }



  return(
    <Card id="card-properties" className="mx-auto card-display" >
      <Card.Img id="card-image" variant="top" src={profile_photo} />
      <Card.Body>
        <Card.Title>{first_name} {last_name}</Card.Title>
        <Card.Text> {university}</Card.Text>
        <Card.Text> <strong>${formatNumber( reserve_price )}</strong></Card.Text>
        <Card.Text id="timer">{hour}h {minute}m left </Card.Text>
        <Card.Text>Offers: { bids.length } </Card.Text>
        <Button variant="primary">Make an Offer</Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;