import React, { useState, useEffect } from "react";
import { Nav, Col, Row, Tab } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { databaseRef } from "../../config/firebase";
import moment from "moment";
import _ from "underscore";
import { connect } from "react-redux";
import EmptyInbox from "./EmptyInbox";

const MessageTab = props => {
	const [employerID] = useState(localStorage.id);
	const [studentID] = useState(props.studentID);
	const [messages, setMessages] = useState("");
	const [keysForMsgObj, setKeysForMsgObj] = useState("");
  const [studentKey, setStudentKey] = useState("");

	useEffect(() => {
		renderMessages();
		// they have clicked here from the profile page and are looking to send a message
  }, []);
  


	const renderMessages = () => {
		if (props.employer) {
			const newRef = databaseRef.child(employerID);

			if (props.newMsg) {
				newRef
					.child(`${studentID}-${props.studentName}`)
					.set(moment().format());
				props.setNewMsg(false);
			}

			newRef.on("value", snapshot => {
				if (snapshot.val() === null && studentID) {
					// there are no messages so we probably need to create one with the new student we are attempting to mesage
					newRef
						.child(`${studentID}-${props.studentName}`)
						.set(moment().format());

					props.setNewMsg(false);

					// student id in the format of num-name
				}
				setMessages(snapshot.val());
				setKeysForMsgObj(_.keys(snapshot.val()));
				// this gets the id of the first message
			});
		} else if (props.student) {
			// need to find all the messages to that student and who they are from etc
			// end goal is to feed in the keys and object for the students emails they have got!
			databaseRef.once("value").then( snapshot => {
				let data = snapshot.val();

				let keys = _.keys(data);

				let result = {};

				keys.map(key => {
					const temp1Keys_Keys = _.keys(data[key]);

					temp1Keys_Keys.map(k => {
						if (Number(k.split("-")[0]) === Number(localStorage.studentID)) {
							setStudentKey(k);
							return (result[key] = { [k]: data[key][k] });
						}
					});
				});

				setMessages(result);
				setKeysForMsgObj(_.keys(result));
			});
		}
	};

	return (
		<Tab.Container
			id='left-tabs-example'
			defaultActiveKey={studentID ? studentID : 0}>
			<Row>
				<Col sm={2}>
					<Nav variant='pills' className='flex-column side-tabs'>
						{keysForMsgObj.length >= 1 && messages ? (
							keysForMsgObj.map((key, index) => {
								if (props.employer) {
									let name = key.split("-")[1]; // gets full name
									let id = key.split("-")[0];
									return (
										<Nav.Item key={index}>
											<Nav.Link eventKey={studentID ? id : index}>
												{name}
											</Nav.Link>
										</Nav.Item>
									);
								} else if (props.student) {
									let keys = _.keys(messages[key][studentKey]);
									let name =
                    messages[key][studentKey][keys[0]] ? messages[key][studentKey][keys[0]]["employer_name"] : 'Incoming Message'
									return (
										<Nav.Item key={index}>
											<Nav.Link eventKey={index}>{name}</Nav.Link>
										</Nav.Item>
									);
								}
							})
						) : (
							<></>
						)}
					</Nav>
				</Col>

				<Col sm={10}>
					<Tab.Content>
						{keysForMsgObj.length >= 1 && messages ? (
							keysForMsgObj.map((key, index) => {
								if (props.employer) {
									let name = key.split("-")[1];
									let id = key.split("-")[0];
									return (
										<Tab.Pane key={index} eventKey={studentID ? id : index}>
											<MessagePanel
												messageContent={messages[key]}
												employerID={employerID}
												studentID={id}
												studentName={name} // these are all the messages between that student and employer
											/>
										</Tab.Pane>
									);
								} else if (props.student) {
									return (
										<Tab.Pane key={index} eventKey={index}>
											<MessagePanel
												messageContent={messages[key][studentKey]}
												employerID={key}
												studentID={localStorage.studentID}
												studentName={studentKey.split("-")[1]} // these are all the messages between that student and employer
												studentKey={studentKey}
											/>
										</Tab.Pane>
									);
								}
							})
						) : (
							<EmptyInbox />
						)}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

const mapStateToProps = state => {
	return {
		employer: state.employer,
		student: state.student,
	};
};

export default connect(mapStateToProps)(MessageTab);
