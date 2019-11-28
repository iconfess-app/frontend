/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import ChangePassword from './views/components/ChangePassword';
import Home from './views/Home';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';

import EditProfile from './views/auth/EditProfile';
import myConfessionsPage from './views/MyConfessions';
import Confessional from './views/Confess';
import Information from './views/Information';
import NotFoundPage from './views/NotFoundPage';
import InternalServer from './views/InternalServer';

import Chat from './Chat';
import Splashscreen from './views/components/SplashScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: true,
      lightMode: this.props.user === undefined ? false : this.props.user.lightMode,
    };
  }

  toggleThemeBackground = () => {
    if (this.props.user.lightMode) {
      console.log(this.props.user.lightMode);
      document.body.style.backgroundColor = 'white';
    }
  };

  componentDidMount = () => {
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', this.state.lightMode ? 'light-mode' : 'dark-mode');
    setTimeout(() => {
      this.setState({
        splashScreen: false,
      });
    }, 4000);
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== undefined) {
      try {
        if (this.props.user.lightMode !== prevProps.user.lightMode) {
          this.setState({
            lightMode: this.props.user.lightMode,
          });
        }
      } catch (error) {
        const lightModeUpdate = this.props.user.lightMode;
        if (lightModeUpdate) {
          this.setState({
            lightMode: lightModeUpdate,
          });
        }
      }
    }
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', this.state.lightMode ? 'light-mode' : 'dark-mode');
  }

  render() {
    const { splashScreen, lightMode } = this.state;
    return (
      <div className={lightMode ? 'light-mode' : 'dark-mode'}>
        {splashScreen ? (
          <Splashscreen />
        ) : (
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/edit" component={EditProfile} />
              <PrivateRoute exact path="/changepw" component={ChangePassword} />
              <PrivateRoute exact path="/myconfessions" component={myConfessionsPage} />
              <PrivateRoute exact path="/confess" component={Confessional} />
              <Route exact path="/privacy-policy" component={Information} />
              <PrivateRoute exact path="/chat" component={Chat} />
              <Route path="/500" component={InternalServer} />
              <Route exact path="*" component={NotFoundPage} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default withAuth(App);
