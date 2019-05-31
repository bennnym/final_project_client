import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Views
import Home from './views/Home'
import NoMatch from './views/NoMatch'
import Profile from './views/Profile'
//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faBuilding, faSignInAlt, faUserPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faUserGraduate, faBuilding, faSignInAlt, faUserPlus, faSpinner)

function App() {
  return (
    <React.Fragment >
      <Router>
        <Switch >
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/deck" component={Deck} /> */}
          <Route
            exact
            path="/profile/:id"
            render={props => <Profile {...props} />}
          />
          <Route component={NoMatch} />

        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
