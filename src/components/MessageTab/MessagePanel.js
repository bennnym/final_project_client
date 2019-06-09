import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import SingleMessage from "./SingleMessage";
import "./Message.css";
import _ from "underscore";
import { databaseRef } from "../../config/firebase";
import axios from 'axios';
import links from '../../links'
import { connect } from "react-redux";
import moment from 'moment';

const MessagePanel = props => {
	const [msgContentKeys, setMsgContentKeys] = useState("");
	const [input, setInput] = useState("");
	const [company, setCompany] = useState("")

	useEffect(() => {
		getMsgContent()
		getEmployerInfo()
	},[]);

	const getMsgContent = () => {
		setMsgContentKeys(_.keys(props.messageContent));
	}

	const getEmployerInfo = () => {
		axios.get(links.root + `employer/${props.employerID}`).then((res) => {
			setCompany(res.data.company)
		});
	}

	const _getInput = e => {
		setInput(e.target.value);
	};

	const _handleClick = () => {

		const messageObj = {
			content: input,
			employer_name: company,
			employer_read: props.employer,
			from: props.employer ? 'employer' : 'student',
			from_employer: props.employer,
			from_student: props.student,
			student_name: props.studentName,
			student_read: props.student,
		}

		const firebaseRef = databaseRef.child(props.employerID).child(`${props.studentID}-${props.studentName}`).child(moment().format())
			
		const otherRef = databaseRef.child(props.employerID).child(`${props.studentID}-${props.studentName}`)

		otherRef.on('value', snapshot => {
	
			setMsgContentKeys(_.keys(snapshot.val()))
		})

		firebaseRef.set(messageObj)

	};

	return (
		<React.Fragment>
			<div className='message-content'>
				{msgContentKeys
					? msgContentKeys.map((key, index) => {
							return (
								<SingleMessage
									key={index}
									identifier={props.messageContent[key]["from"]}
									sender={
										props.messageContent[key]["from_employer"]
											? props.messageContent[key]["employer_name"]
											: props.messageContent[key]["student_name"]
									} // check who sent msg
									content={props.messageContent[key]["content"]}
								/>
							);
					  })
					: ""}
			</div>
			<InputGroup className='message-input'>
				<InputGroup.Prepend />
				<FormControl
					onChange={_getInput}
					as='textarea'
					aria-label='With textarea'
				/>
				<Button onClick={_handleClick} variant='dark'>
					Send
				</Button>
			</InputGroup>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		employer: state.employer,
		student: state.student,
	};
};

export default connect(mapStateToProps)(MessagePanel);
