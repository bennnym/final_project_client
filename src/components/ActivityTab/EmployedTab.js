import React, { useState, useEffect } from "react";
import "./ActivityTab.css";
import TabCard from "./TabCard";
import EmptyTab from './EmptyTab'
import axios from "axios";
import links from "../../links";
import moment from "moment";

const EmployedTab = () => {
	const [offerData, setOfferData] = useState("");

	const formatNumber = num => {
		//formats with commas
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};

	useEffect(() => {
		getOffersData();
	}, []);

	const getOffersData = () => {
		const jwtAuth = {
			headers: {
				Authorization: "Bearer " + localStorage.jwt,
			},
		};

		axios
			.get(links.root + `winningbids/${localStorage.id}`, jwtAuth)
			.then(res => {
				setOfferData(res.data);
			});
  };
	return (
		<React.Fragment>
			<div className='tab-heading'>Employed</div>
      {offerData.length > 0 ? (
        offerData.map(student_info => {
          const { created_at } = student_info.bid;
          const {
            profile_photo,
            first_name,
            last_name,
            university,
            email,
            id,
            reserve_price
          } = student_info.student;
          const OfferDate = moment(created_at)
            .format()
            .slice(0, 10);

          return (
            <TabCard
              date={OfferDate}
              bidAmount={formatNumber(student_info.bid.amount)}
              profilePhoto={profile_photo}
              firstName={first_name}
              lastName={last_name}
              university={university}
              email={email}
              status={"won"}
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
};

export default EmployedTab;
