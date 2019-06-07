import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Nav/Navigation";
import ContentTable from "../components/ContentTable/ContentTable";
import ProfileDisplay from "../components/ProfileDisplay/ProfileDisplay";
import AccordionCV from "../components/AccordionCV/AccordionCV"
import axios from "axios";
import links from "../links";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../components/ProfileDisplay/Profile.css";

const Profile = props => {
	const [data, setData] = useState({});
	const [bidArr, setBidArr] = useState(false);
	const [id, setID] = useState("");

	const renderProfile = () => {
		if (!props.location.state) {
			var newID = window.location.pathname.split("/");
			newID = newID[newID.length - 1];
		} else {
			newID = props.location.state.id;
		}
		setID(newID);

		axios
			.get(links.root + `student/${newID}`)
			.then(res => {
				setData(res.data);
				setBidArr(res.data.bids);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		renderProfile();
	}, []);

	if (data === null) {
		return <Redirect to='/auctions' />;
	}
	return (
		<React.Fragment>
			<Navigation />
			<Layout>
			<Row className='profile-layout'>
				<Col xs={5}>
					{data ? (
						<div className='text-center'>
							{" "}
							<h1 className='mobile-name'>
								{data.first_name} {data.last_name}
							</h1>
							<img
								className='profile-image mx-auto'
								src={data.profile_photo}
								alt='profile'
							/>
						</div>
					) : (
						""
					)}
				</Col>
				<Col xs={6}>
					<ProfileDisplay renderProfile={renderProfile} data={data} bidArr={bidArr} />
				</Col>
			</Row>



			<ContentTable 
        data={data}
      />

      <AccordionCV
        cv={data.cv}
      />

			</Layout>
			<Footer />
		</React.Fragment>
	);
};

export default Profile;
