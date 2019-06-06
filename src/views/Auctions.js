import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Nav/Navigation";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";
import ShowCards from "../components/ShowCards/ShowCards";
import SearchInput from "../components/SearchInput/SearchInput";

const Auctions = props => {
	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<ImageCarousel />
			<Layout>
				<SearchInput />
				<ShowCards />
			</Layout>
			<Footer />
		</React.Fragment>
	);
};

export default Auctions;
