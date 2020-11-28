import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import './scss/styles.scss';
import AuthContainer from './components/auth/AuthContainer';
import AdvertsContainer from './components/adverts/AdvertsContainer';

// import store from './store';
// import { Provider } from 'react-redux';

const App = () => {
    const [userData, setUserData] = useState(null);

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    {!userData ? <AuthContainer /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/adverts">
                    {userData ? <AdvertsContainer /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/">
                    {userData ? <Redirect to="/adverts" /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
);