import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Nav/Navigation";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";
import ShowCards from "../components/ShowCards/ShowCards";
import SearchInput from "../components/SearchInput/SearchInput";

const Auctions = props => {
	const [gradData, setGradData] = useState([]);

	return (
		<React.Fragment>
			<Navigation href='/auctions' />
			<ImageCarousel />
			<Layout>
				<SearchInput gradData={gradData} setGradData={setGradData} />
				<ShowCards gradData={gradData} setGradData={setGradData} />
			</Layout>
			<Footer />
		</React.Fragment>
	);
};

export default Auctions;
