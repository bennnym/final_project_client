import React from "react";
import Navigation from "../components/Nav/Navigation";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import ActivityTab from '../components/ActivityTab/ActivityTab'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap'

const MyAcc = props => {
  if (!props.employer) {
    return <Redirect to='/' />;
	}
	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<Layout>
				<Tabs className="top-tabs" defaultActiveKey="activity" id="uncontrolled-tab-example">
					<Tab eventKey="activity" title="Activity">
						<ActivityTab />
					</Tab>
					<Tab eventKey="messages" title="Messages">
					</Tab>
					<Tab eventKey="account" title="Account" >
						</Tab>
				</Tabs>
			</Layout>
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		employer: state.employer,
	};
};

export default connect(mapStateToProps)(MyAcc);
