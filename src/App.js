import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
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
	const [isEmployer, setIsEmployer] = useState(localStorage.employer ? JSON.parse(localStorage.employer) : '');
	const [isStudent, setIsStudent] = useState(localStorage.student ? JSON.parse(localStorage.student) : '') ;

	const initialState = {
		employer: localStorage.employer ? JSON.parse(localStorage.employer):false,
		student: localStorage.student ? JSON.parse(localStorage.student) : false
	};

	console.log('this is what state.employer is', initialState.employer);

	const reducer = (state=initialState, action) => {
		console.log('reducer is about to be called with the action', action);
		switch(action.type) {
			case 'SETSTUDENT':
				return {
					student: !state.student
				};
			case 'SETEMPLOYER':
				console.log('got in here but seemingly not changing state');
				return {
					employer: !state.employer
				};
			default:
				return state;
		} 
	}

	const store = createStore(
		reducer, /* preloadedState, */
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return (
		<React.Fragment>
		<Provider store={store}>
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
		</Provider>
		</React.Fragment>
	);
}

export default App;
