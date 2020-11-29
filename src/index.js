import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink, Link } from "react-router-dom";

// import store from './store';
// import { Provider } from 'react-redux';
import storage from './utils/storage';
import { configureClient } from './api/client';
import AuthContainer from './components/auth/AuthContainer';
import AdvertsContainer from './components/adverts/AdvertsContainer';
import NotFoundPage from './components/globals/NotFoundPage';

import './scss/styles.scss';
import AdvertsCreate from './components/adverts/AdvertsCreate';
import AdvertsDetail from './components/adverts/AdvertsDetail';

const loggedUser = storage.get('loggedUser') || { email: null, token: null };
configureClient(loggedUser.token);

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleAuthUser = () => {
        if (loggedUser && loggedUser.email) setUserData(loggedUser);
    }

    const handleLogOut = () => {
        if (loggedUser) storage.remove('loggedUser');
        setUserData(null);
    }
    
    useEffect(() => {
        handleAuthUser();
    }, []);

    return (
        <div className="app">
            <Router>
                <nav className="navbar navbar-expand navbar-light bg-light">
                        <ul className="nav navbar-nav ml-auto">
                            {userData &&
                                <>
                                    <li className="nav-item">
                                        <Link to="/adverts">Adverts</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/adverts/new">Create new Advert</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" onClick={handleLogOut}>Log out</Link>
                                    </li>
                                </>
                            }
                            {!userData &&
                                <li className="nav-item">
                                    <Link to="/login">Log in</Link>
                                </li>
                            }
                        </ul>
                </nav>
                <Switch>
                    <Route exact path="/login">
                        {!userData ? <AuthContainer setUserData={setUserData} setIsLoading={setIsLoading} /> : <Redirect to="/adverts" />}
                    </Route>
                    <Route exact path="/adverts/new">
                        
                        {userData ? <AdvertsCreate isLoading={isLoading} setIsLoading={setIsLoading} /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/adverts/:id">
                        
                        {userData ? <AdvertsDetail isLoading={isLoading} setIsLoading={setIsLoading} /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/adverts">
                        
                        {userData ? <AdvertsContainer isLoading={isLoading} setIsLoading={setIsLoading} /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/">
                        {userData ? <Redirect to="/adverts" /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/404" exact>
                        <NotFoundPage />
                    </Route>
                    <Route>
                        <Redirect to="/404" />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
};

ReactDOM.render(<App />,
    document.getElementById('root')
);