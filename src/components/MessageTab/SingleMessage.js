import React from "react";

const SingleMessage = (props) => {

	return (
		<div className={props.identifier}>
			<h6>{props.sender}</h6>
			<p>
				{props.content}
			</p>
		</div>
	);
};

export default SingleMessage;
