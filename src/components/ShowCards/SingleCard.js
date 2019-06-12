import React, { useState, useEffect } from "react";
import "./ShowCards.css";
import moment from "moment";
import QuickOfferModal from "../QuickOfferModal/QuickOfferModal";
import { Button } from "react-bootstrap";
import LoginForm from "../LoginModal/LoginForm";
import { Link } from "react-router-dom";

const SingleCard = props => {
	const {
		image,
		timeLeft,
		price,
		firstName,
		lastName,
		university,
		id,
		bids,
		renderCards,
		reservePrice,
	} = props;
	const [day, setDays] = useState("");
	const [hour, setHours] = useState("");
	const [minute, setMinutes] = useState("");
	const [second, setSeconds] = useState("");
	const [modalShow, setModalShow] = useState(false);

	let newPrice = "";

	const formatNumber = num => {
		if (num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		} //formats with commas
		else {
			return "";
		}
	};

	newPrice = formatNumber(price);

	useEffect(() => {
		setInterval(() => {
			let timeNow = moment.utc();
			let auctionEnd = moment(timeLeft);
			let dif = new moment.duration(auctionEnd - timeNow);

			// set state
			const { days, hours, minutes, seconds } = dif._data;
			// setDays(days)
			setDays(days);
			setHours(hours);
			setMinutes(minutes);
			setSeconds(seconds);
		}, 1000);
	}, []);

	return (
		<React.Fragment>
			<div id='card-holder' className='container py-3'>
				<div id='horizontal-card' className='card'>
					<div className='row '>
						<div className='col-md-4'>
							<div
								style={{ backgroundImage: `url(${image})` }}
								className='w-100 auction-card-image'
							></div>
						</div>
						<div className='col-md-4 px-3'>
							<div className='card-block px-3'>
								<h4 id='name' className='card-title'>
									{firstName} {lastName}
								</h4>
								<p id='uni' className='card-text'>
									{university}{" "}
								</p>
								<p id='price' className='card-text'>
									{newPrice ? `$${newPrice}` : `$${price}`}
								</p>
								<p id='timer' className='card-text'>
									{day === 0
										? `${hour}h ${minute}m ${second}s left`
										: `${day}d ${hour}h ${minute}m left`}
								</p>
								<p id='uni' className='card-text'>
									Offers: {bids ? bids.length : ""}
								</p>
							</div>
						</div>
						<div className='col-md-4 px-3'>
							<div className='card-block px-3 card-buttons'>
								<p>
									<Button variant='primary' onClick={() => setModalShow(true)}>
										Quick Offer
									</Button>

									<QuickOfferModal
										show={modalShow}
										studentID={id}
										onHide={() => setModalShow(false)}
										form={<LoginForm />}
										renderCards={renderCards}
										bids={bids}
										reservePrice={reservePrice}
									/>
								</p>
								<p>
									<Link
										to={{
											pathname: `/profile/${id}`,
											state: {
												id: id,
											},
										}}>
										<Button>View Profile</Button>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div />
		</React.Fragment>
	);
};

export default SingleCard;
