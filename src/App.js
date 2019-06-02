import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Views
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import Profile from "./views/Profile";
import Auctions from "./views/Auctions";
//Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUserGraduate,
	faBuilding,
	faSignInAlt,
	faUserPlus,
	faSpinner,
	faSearch
} from "@fortawesome/free-solid-svg-icons";

library.add(faUserGraduate, faBuilding, faSignInAlt, faUserPlus, faSpinner, faSearch);

function App() {
	const [isEmployer, setIsEmployer] = useState("");
	const [isStudent, setIsStudent] = useState("");

	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route
						exact
						path='/'
						render={props => (
							<Home
								{...props}
								isEmployer={isEmployer}
								setIsEmployer={setIsEmployer}
								isStudent={isStudent}
								setIsStudent={setIsStudent}
							/>
						)}
					/>
					<Route
						exact
						path='/profile/:id'
						render={props => (
							<Profile
								{...props}
								isEmployer={isEmployer}
								setIsEmployer={setIsEmployer}
								isStudent={isStudent}
								setIsStudent={setIsStudent}
							/>
						)}
					/>
					<Route
						exact
						path='/auctions'
						render={props => (
							<Auctions
								{...props}
								isEmployer={isEmployer}
								setIsEmployer={setIsEmployer}
								isStudent={isStudent}
								setIsStudent={setIsStudent}
							/>
						)}
					/>
					<Route component={NoMatch} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
