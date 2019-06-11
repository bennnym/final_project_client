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
				newRef.once("value").then(snapshot => {
					const keys = _.keys(snapshot.val()); // gets the students
					const match = keys.filter(key => {
						return Number(key.split("-")[0]) === studentID;
					});

					if (match.length === 0) {
						newRef
							.child(`${studentID}-${props.studentName}`)
							.set(moment().format());
						props.setNewMsg(false);
					}
				});
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
				const messageData = snapshot.val();
				const studentKeys = _.keys(messageData);
				let count = 0; // this counts how many unread msgs we have
				studentKeys.forEach(student => {
					let msgKeys = _.keys(messageData[student]);

					let read = msgKeys.filter(msg => {
						return messageData[student][msg]["employer_read"] === false;
					});

					if (read.length >= 1) {
						count += 1;
					}
				});

				props.setUnreadMsgs(count);

				setMessages(snapshot.val());
				setKeysForMsgObj(_.keys(snapshot.val()));
				// this gets the id of the first message
			});
		} else if (props.student) {
			// need to find all the messages to that student and who they are from etc
			// end goal is to feed in the keys and object for the students emails they have got!
			databaseRef.on("value",snapshot => {
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

				// calculate how many messages are unread

				const employerKeys = _.keys(data)

				let studentName = _.keys(data[employerKeys[0]])
				studentName = studentName[0]
				let count = 0;

				employerKeys.forEach(key => {
					let msgKeys = _.keys(data[key][studentName])

					let unread = msgKeys.filter(k => {

						return data[key][studentName][k]["student_read"] === false

					})

					if (unread.length >= 1) { count += 1 }

				})

				props.setUnreadMsgs(count);

				setMessages(result);
				setKeysForMsgObj(_.keys(result));
			});
		}
	};

	const isNewMsg = (msgObject, check, reader) => {
		// checks if the message has been read

		let keys = _.keys(msgObject);

		let read = keys.filter(obj => {
			return !msgObject[obj][reader] && msgObject[obj]["from"] === check;
		});

		return read.length >= 1 ? "false" : "true";
	};

	const _markStudentRead = (e) => {
		const company = e.target.text
		databaseRef.once("value").then(snapshot => {
		const companyKeys = _.keys(messages)

		companyKeys.forEach( key => {
			let msgKeys = _.keys(messages[key][studentKey])
			
			if (messages[key][studentKey][msgKeys[0]]["employer_name"] === company ){
				msgKeys.forEach( msg => {
					
					if (messages[key][studentKey][msg]["from"] === "employer") {
						databaseRef.child(key).child(studentKey).child(msg).child("student_read").set(true)
					}
				})
			}
		})
		})
	}

	const _markAsRead = e => {
		const studentName = e.target.text;
		databaseRef.once("value").then(snapshot => {
			const database = snapshot.val();

			const studentMsgs = database[employerID];

			const studentKeys = _.keys(studentMsgs);

			const studentKey = studentKeys.filter(key => {
				return key.split("-")[1] === studentName;
			});

			const individualMsgKeys = _.keys(database[employerID][studentKey]);

			individualMsgKeys.map(key => {
				if (database[employerID][studentKey[0]][key]["from"] === "student") {
					databaseRef
						.child(employerID)
						.child(studentKey[0])
						.child(key)
						.child("employer_read")
						.set(true);
				}
			});
		});
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
									let style_id = isNewMsg(
										messages[key],
										"student",
										"employer_read"
									);
									let name = key.split("-")[1]; // gets full name
									let id = key.split("-")[0];
									return (
										<Nav.Item className='myacc-nav' id={style_id} key={index}>
											<Nav.Link
												onClick={_markAsRead}
												value={key}
												eventKey={studentID ? id : index}>
												{name}
											</Nav.Link>
										</Nav.Item>
									);
								} else if (props.student) {
									let style_id = isNewMsg(
										messages[key][studentKey],
										"employer",
										"student_read"
									);
									let keys = _.keys(messages[key][studentKey]);
									let name = messages[key][studentKey][keys[0]]
										? messages[key][studentKey][keys[0]]["employer_name"]
										: "Incoming Message";
									return (
										<Nav.Item
											id={style_id}
											onClick={_markStudentRead}
											className='myacc-nav'
											key={index}
											value={key}>
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
					<Tab.Content >
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
												messageContentKeys={_.keys(messages[key][studentKey])}
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
