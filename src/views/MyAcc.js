import React, { useState } from "react";
import Navigation from "../components/Nav/Navigation";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import ActivityTab from "../components/ActivityTab/ActivityTab";
import MessageTab from "../components/MessageTab/MessageTab";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

const MyAcc = props => {
	const [newMsg, setnewMsg] = useState(props.location.state ? true : false)
	console.log('this is newMsg', newMsg)

	if (!props.employer && !props.student) {
		return <Redirect to='/' />;
	}



	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<Layout>
				<Tabs
					className='top-tabs'
					defaultActiveKey={props.location.state ? "messages" : props.student ? "messages" : "activity"}
					id='uncontrolled-tab-example'>
					{props.employer ? (
						<Tab eventKey='activity' title='Activity'>
							<ActivityTab />{" "}
						</Tab>
					) : (
						""
					)}

					<Tab eventKey='messages' title='Messages'>
						{props.employer ? (
							<MessageTab
								newMsg={newMsg}
								setNewMsg={setnewMsg}
								studentName={
									props.location.state ? props.location.state.name : ""
								}
								studentID={props.location.state ? props.location.state.id : ""}
							/>
						) : (<MessageTab
							newMessage={props.location.state ? true : false}
						/>
						)}
					</Tab>
					<Tab eventKey='account' title='Account' />
				</Tabs>
			</Layout>
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		employer: state.employer,
		student: state.student,
	};
};

export default connect(mapStateToProps)(MyAcc);
