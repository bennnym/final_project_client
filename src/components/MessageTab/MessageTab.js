import React, { useState, useEffect } from "react";
import { Nav, Col, Row, Tab } from "react-bootstrap";
import MessagePanel from "./MessagePanel";
import { databaseRef } from "../../config/firebase";
import moment from "moment";
import _ from "underscore";
import { connect } from "react-redux";

const MessageTab = props => {
	const [employerID] = useState(localStorage.id);
	const [studentID] = useState(props.studentID);
	const [messages, setMessages] = useState("");
	const [keysForMsgObj, setKeysForMsgObj] = useState("");

	useEffect(() => {
		renderMessages();
		// they have clicked here from the profile page and are looking to send a message
	}, []);

	const renderMessages = () => {
     databaseRef.once("value").then(snapshot => {
       console.log(snapshot.val(), 'this is the high level snapshot')
      
       let data = snapshot.val()

       let keys = _.keys(data)

       let result = {}

       keys.map(key => {
         const temp1Keys_Keys = _.keys(data[key])

         temp1Keys_Keys.map(k => {
           if (k.split('-')[0] == 33) {
             result[key] = { [k]: data[key][k] }
           }
         })
       })

       console.log(result);

     }) 

    if ( props.employer ){
		const newRef = databaseRef.child(employerID);

		if (props.newMessage) {
			newRef.child(`${studentID}-${props.studentName}`).set(moment().format());
		}

		newRef.on("value", snapshot => {
			if (snapshot.val() === null) {
				// there are no messages so we probably need to create one with the new student we are attempting to mesage
				newRef
					.child(`${studentID}-${props.studentName}`)
					.set(moment().format());

				renderMessages();
				// student id in the format of num-name
			}
			setMessages(snapshot.val());
			setKeysForMsgObj(_.keys(snapshot.val()));
			// this gets the id of the first message
    });
  } else if ( props.student ) {
    // need to find all the messages to that student and who they are from etc

    // end goal is to feed in the keys and object for the students emails they have got!
      databaseRef.once("value").then(snapshot => {
        let data = snapshot.val()

        let keys = _.keys(snapshot.val())

        keys.map(key => {
          const student_keys = _.keys(data[key])

          var match = student_keys.filter( i => {
            return (i.split('-')[0] === localStorage.studentID)
          })
            console.log(match)
        })
      })
  }
	};

	return (
		<Tab.Container
			id='left-tabs-example'
			defaultActiveKey={studentID ? studentID : 0}>
			<Row>
				<Col sm={2}>
					<Nav variant='pills' className='flex-column side-tabs'>
						{keysForMsgObj ? (
							keysForMsgObj.map((key, index) => {
								let name = key.split("-")[1]; // gets full name
								let id = key.split("-")[0];
								return (
									<Nav.Item key={index}>
										<Nav.Link eventKey={index === 0 ? index : id}>
											{name}
										</Nav.Link>
									</Nav.Item>
								);
							})
						) : (
							<></>
						)}
					</Nav>
				</Col>

				<Col sm={10}>
					<Tab.Content>
						{keysForMsgObj ? (
							keysForMsgObj.map((key, index) => {
								let name = key.split("-")[1];
								let id = key.split("-")[0];
								return (
									<Tab.Pane key={index} eventKey={id}>
										<MessagePanel
											messageContent={messages[key]}
											employerID={employerID}
											studentID={id}
											studentName={name} // these are all the messages between that student and employer
										/>
									</Tab.Pane>
								);
							})
						) : (
							<></>
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
