import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Views
import Home from './views/Home'
import NoMatch from './views/NoMatch'
//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faBuilding, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faUserGraduate, faBuilding, faSignInAlt, faUserPlus)

function App() {
  return (
    <React.Fragment >
    <Router>
    <Switch >
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/deck" component={Deck} /> */}
    <Route component={NoMatch} />

    </Switch>
    </Router>
    </React.Fragment>
  );
}

export default App;
