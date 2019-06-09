import React, { useState, useEffect } from "react";
import "./ActivityTab.css";
import TabCard from "./TabCard";
import EmptyTab from './EmptyTab'
import axios from "axios";
import links from "../../links";
import moment from "moment";

const OfferTab = () => {
	const [offerData, setOfferData] = useState("");

	const formatNumber = num => {
		//formats with commas
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};

	useEffect(() => {
		getOffersData();
	}, []);

	const getOffersData = () => {


		axios.get(links.root + `getbids/${localStorage.id}`).then(res => {
			setOfferData(res.data);
		});
	};

	const calculateStatus = student_info => {
		if (student_info.bid) {
			// SOLD if there are bids and time is past auction_duration
			if (
				student_info.bid.id === student_info.student_bids.id &&
				moment(student_info.student.auction_duration) < moment()
			) {
				return "won";
				// ACTIVE if date now is less than auction duration
			} else if (moment(student_info.student.auction_duration) > moment()) {
				return "live";
			} else if (
				student_info.bid.id !== student_info.student_bids.id &&
				moment(student_info.student.auction_duration) < moment()
			) {
				return "lost";
			}
			// Won if student_bids.student_id === their id
		}
	};

	return (
		<React.Fragment>
			<div className='tab-heading'>Offers</div>
			{offerData.length > 0 ? (
				offerData.map((student_info, index) => {
					const { created_at } = student_info.student_bids;
					const {
						profile_photo,
						first_name,
						last_name,
						university,
						email,
						id,
					} = student_info.student;
					const OfferDate = moment(created_at)
						.format()
						.slice(0, 10);

					return (
						<TabCard
							key={{first_name}+(index + 1).toString()}
							date={OfferDate}
							bidAmount={formatNumber(student_info.bid.amount)}
							profilePhoto={profile_photo}
							firstName={first_name}
							lastName={last_name}
							university={university}
							email={email}
							status={calculateStatus(student_info)}
							salePrice={formatNumber(student_info.student_bids.amount)}
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

export default OfferTab;
