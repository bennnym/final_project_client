import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EmptyInbox = () => {
	return (
		<React.Fragment>
			<div className='tab-card empty'>
				<h1>Wow, such empty</h1>
				<FontAwesomeIcon className='fa-5x' icon='inbox' />
				<p>
					Are you lonely? Check out our <Link to='/auctions'>Auctions!</Link>
				</p>
			</div>
		</React.Fragment>
	);
};

export default EmptyInbox;
