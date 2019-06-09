import React, { useState, useEffect } from "react";
import "./ActivityTab.css";
import TabCard from "./TabCard";
import EmptyTab from './EmptyTab'
import axios from "axios";
import links from "../../links";
import moment from "moment";

const WatchlistTab = () => {
  const [offerData, setOfferData] = useState("");

  useEffect(() => {
    getOffersData();
  }, []);

  const formatNumber = num => {
    //formats with commas
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const getOffersData = () => {

    axios.get(links.root + `watchlist/${localStorage.id}`).then(res => {
      setOfferData(res.data);
    });
  };

  const calculateStatus = date => {
    if ( moment() > moment(date)) {
      return 'ended'
    } 

    return 'live'
  };


  return(
    <React.Fragment>
        <div className='tab-heading'>Watchlist</div>
      {offerData.length > 0 ? (
        offerData.map((student_info, index) => {
          const { created_at } = student_info.watchlist;
          const {
            profile_photo,
            first_name,
            last_name,
            university,
            email,
            id,
            auction_duration,
            reserve_price
          } = student_info.student;
          const offerDate = moment(auction_duration)
            .format()
            .slice(0, 10);
          

          return (
            <TabCard
              key={{ first_name } + (index + 2).toString() }
              list="watch"
              date={offerDate}
              bidAmount={formatNumber(student_info.current_price > reserve_price ? student_info.current_price : reserve_price)}
              profilePhoto={profile_photo}
              firstName={first_name}
              lastName={last_name}
              university={university}
              email={email}
              status={calculateStatus(auction_duration)}
              salePrice={formatNumber(reserve_price)}
              studentID={id}
              bidCount={student_info.bid_count}
            />
          );
        })
      ) : (
          <EmptyTab />
        )}
    </React.Fragment>

  );
}

export default WatchlistTab;