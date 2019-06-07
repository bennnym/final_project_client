import React, { useState, useEffect } from 'react'
import './ActivityTab.css'
import TabCard from './TabCard'
import axios from 'axios'
import links from '../../links'

const OfferTab = () => {
  const [offerData, setOfferData ] = useState([])

  useEffect(() => {
    renderOffers()
  },[])

  const renderOffers = () => {

    const jwtAuth = {
      headers: {
        Authorization: "Bearer " + localStorage.jwt
      }
    }

    axios
    .get(links.root + `getbids/${localStorage.id}`, jwtAuth )
    .then((res) => {
      console.log(res);
    })
  }
  return(
    <React.Fragment>
      <div className="tab-heading">
        Offers
      </div>
      <TabCard/>
      <TabCard/>
      <TabCard/>
      <TabCard/>
      <TabCard/>

    </React.Fragment>
  );
}

export default OfferTab;