import React from "react";
import Navigation from "../components/Nav/Navigation";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Watchlist = props => {
  if (!props.employer) {
    return <Redirect to='/' />;
	}
	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<Layout>
				<h1>Watchlist coming sooooooon</h1>
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

export default connect(mapStateToProps)(Watchlist);
