/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import ChangePassword from './views/components/ChangePassword';
import Home from './views/Home';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import EditProfile from './views/auth/EditProfile';
import myConfessionsPage from './views/MyConfessions';
import Confessional from './views/Confess';
import Information from './views/Information';
import NotFoundPage from './views/NotFoundPage';
import InternalServer from './views/InternalServer';

import Chat from './Chat';
import Splashscreen from './views/components/SplashScreen';

class App extends Component {
  state = {
    splashScreen: true,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        splashScreen: false,
      });
    }, 4000);
  };

  render() {
    const { splashScreen } = this.state;
    return (
      <>
        {splashScreen ? (
          <Splashscreen />
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <AnonRoute exact path="/login" component={Login} />
              <AnonRoute exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/private" component={PrivateView} />
              <PrivateRoute exact path="/edit" component={EditProfile} />
              <PrivateRoute exact path="/changepw" component={ChangePassword} />
              <Route exact path="/myconfessions" component={myConfessionsPage} />
              <Route exact path="/confess" component={Confessional} />
              <Route exact path="/privacy-policy" component={Information} />
              <Route exact path="/chat" component={Chat} />
              <Route path="/500" component={InternalServer} />
              <Route exact path="*" component={NotFoundPage} />
            </Switch>
          </Router>
        )}
      </>
    );
  }
}

export default withAuth(App);
