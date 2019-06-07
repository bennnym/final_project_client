import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/reducers/reducers'
// Views
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import Profile from "./views/Profile";
import Auctions from "./views/Auctions";
import Watchlist from "./views/Watchlist"
//Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUserGraduate,
	faBuilding,
	faSignInAlt,
	faUserPlus,
	faSpinner,
	faSearch,
	faCheckCircle,
	faTimesCircle,
	faHeart
} from "@fortawesome/free-solid-svg-icons";




library.add(faUserGraduate, faBuilding, faSignInAlt, faUserPlus, faSpinner, faSearch, faCheckCircle, faTimesCircle, faHeart);

function App() {

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
							/>
						)}
					/>
					<Route
						exact
						path='/profile/:id'
						render={props => (
							<Profile
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path='/auctions'
						render={props => (
							<Auctions
								{...props}
							/>
						)}
					/>
						<Route
							exact
							path='/watchlist'
							render={props => (
								<Watchlist
									{...props}
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
