import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import "./GradCard.css";
import HomeCard from "./HomeCard";
import axios from "axios";
import links from "../../../src/links";
import _ from "underscore";
import moment from "moment";

import { Spring } from "react-spring/renderprops";

// Look at Trail later https://reactgo.com/react-animation-tutorial-examples/

const GradCard = props => {
	const [cardsData, setCardsData] = useState("");

	const _renderHomeCards = () => {
		axios.get(links.root + "students/ending").then(res => {
			setCardsData(res.data);
		});
	}

	useEffect(() => {
		_renderHomeCards()
	}, []);

	return (
		<Spring
			from={{ opacity: 0 }}
			to={{ opacity: 1 }}
			config={{ duration: 1500 }}>
			{props => (
				<div >
					<CardGroup>
						{cardsData
							? _.first(cardsData, 4).map(c => {
									let timeNow = moment.utc();
									let auctionEnd = moment(c.auction_duration);
									let dif = new moment.duration(auctionEnd - timeNow);

									if (dif > 0) {
										return <HomeCard key={c.id} render={_renderHomeCards	} data={c} />;
									}
							  })
							: ""}
					</CardGroup>
				</div>
			)}
		</Spring>
	);
};

export default GradCard;
