import React, { useState, useEffect } from "react";
import { Nav, Col, Row, Tab } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { databaseRef } from "../../config/firebase";
import moment from "moment";
import _ from "underscore";

const MessageTab = props => {
	const [employerID] = useState(localStorage.id);
	const [studentID] = useState(props.studentID);
	const [messages, setMessages] = useState("");
	const [keysForMsgObj, setKeysForMsgObj] = useState("");
  	useEffect(() => {
    renderMessages()
				// they have clicked here from the profile page and are looking to send a message
  }, []);

  const renderMessages = () => {
    const newRef = databaseRef.child(employerID);

    newRef.on("value", snapshot => {
      
      if (snapshot.val() === null) {
        // there are no messages so we probably need to create one with the new student we are attempting to mesage
        newRef.child(`${studentID}-${props.studentName}`).set(moment().format())
        renderMessages()
        // student id in the format of num-name
      }
      setMessages(snapshot.val());
      setKeysForMsgObj(_.keys(snapshot.val()))
    })
  }

	return (
		<Tab.Container id='left-tabs-example' defaultActiveKey='0'>
			<Row>
				<Col sm={2}>
					<Nav variant='pills' className='flex-column side-tabs'>
            {keysForMsgObj ? keysForMsgObj.map((key, index) => {
              let name = key.split("-")[1]; // gets full name
              return (
                <Nav.Item key={index}>
                  <Nav.Link eventKey={`${index}`}>{name}</Nav.Link>
                </Nav.Item>
              );
            }) : <></>}
					</Nav>
				</Col>

				<Col sm={10}>
					<Tab.Content>
            {keysForMsgObj ? keysForMsgObj.map((key, index) => {
              let name = key.split("-")[1]
              let id = key.split("-")[0]
              return (
                <Tab.Pane key={index} eventKey={`${index}`}>
							<MessagePanel
              messageContent={messages[key]}
              employerID={employerID}
              studentID={id}
              studentName={name} // these are all the messages between that student and employer
               />
						</Tab.Pane>
              );
            }) : <></>}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MessageTab;
