import React from "react";
import Navigation from "../components/Nav/Navigation";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import ActivityTab from "../components/ActivityTab/ActivityTab";
import MessageTab from "../components/MessageTab/MessageTab";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

const MyAcc = props => {
	if (!props.employer && !props.student) {
		return <Redirect to='/' />;
	}

	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<Layout>
				<Tabs
					className='top-tabs'
					defaultActiveKey={props.location.state ? "messages" : "activity"}
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
								newMessage={props.location.state ? true : false}
								studentName={
									props.location.state ? props.location.state.name : ""
								}
								studentID={props.location.state ? props.location.state.id : ""}
							/>
						) : ( ''
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
