import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

// import store from './store';
// import { Provider } from 'react-redux';
import storage from './utils/storage';
import { configureClient } from './api/client';
import { AuthContextProvider } from './contexts/auth';
import AuthContainer from './components/auth/AuthContainer';
import AdvertsContainer from './components/adverts/AdvertsContainer';
import NotFoundPage from './components/globals/NotFoundPage';

import './scss/styles.scss';
import AdvertsCreate from './components/adverts/AdvertsCreate';
import AdvertsDetail from './components/adverts/AdvertsDetail';
import PrivateRoute from './components/auth/PrivateRoute';

const { token } = storage.get('auth') || { token: null };
configureClient(token);
class App extends React.Component {
    state = {
        isLogged: !!token,
    };

    handleLogin = cb => {
        this.setState({ isLogged: true }, cb);
    };

    handleLogout = () => {
        this.setState({ isLogged: false });
    };
    

    render() {
        const { isLogged } = this.state;
        console.log(isLogged)
        return (
            <div className="app">
                <AuthContextProvider
                    value={{
                        isLogged,
                        onLogin: this.handleLogin,
                        onLogout: this.handleLogout,
                    }}
                >
                    <Router>
                        <nav className="navbar navbar-expand navbar-light bg-light">
                                <ul className="nav navbar-nav ml-auto">
                                    {isLogged &&
                                        <>
                                            <li className="nav-item">
                                                <Link to="/adverts">Adverts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/adverts/new">Create new Advert</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/" onClick={this.handleLogOut}>Log out</Link>
                                            </li>
                                        </>
                                    }
                                    {!isLogged &&
                                        <li className="nav-item">
                                            <Link to="/login">Log in</Link>
                                        </li>
                                    }
                                </ul>
                        </nav>
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/adverts" />
                            </Route>
                            <Route exact path="/login">
                                {routerProps => (
                                    <AuthContainer onLogin={this.handleLogin} isLogged={isLogged} {...routerProps} />
                                )}
                            </Route>
                            <PrivateRoute path="/adverts/new" exact component={AdvertsCreate} />
                            <PrivateRoute path="/adverts/:id" exact component={AdvertsDetail} />
                            <PrivateRoute path="/adverts" exact component={AdvertsContainer} />
                            <Route path="/404" exact>
                                <NotFoundPage />
                            </Route>
                            <Route>
                                <Redirect to="/404" />
                            </Route>
                        </Switch>
                    </Router>
                </AuthContextProvider>
                <div className="footer">
                    <p>Made with Love by Kiara Mendoza García</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />,
    document.getElementById('root')
);