import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/Landing';
import MainPage from './components/main_page/MainPage';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import { AuthProvider } from './context/AuthContext';

import './app.css';

export default function VOCAllence() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route path="/" component={LandingPage} exact={true} />
        <Switch>
          <React.Fragment>
            <Route path="/main" component={MainPage} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
            <Route path="/signup" component={Login} exact={true} />
          </React.Fragment>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
