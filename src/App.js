import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import ChangePassword from './components/ChangePassword';
import Home from './views/components/Home';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import EditProfile from './views/auth/EditProfile';
import myConfessionsPage from './views/MyConfessions';
import Confessional from './views/Confess';

class App extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <>
        <button onClick={handleLogout}>logout</button>
        <Router>

          <Route exact path="/" component={Home} />
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/private" component={PrivateView} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
          <PrivateRoute exact path="/changepw" component={ChangePassword} />
          <Route exact path="/myconfessions" component={myConfessionsPage} />
          <Route exact path="/confess" component={Confessional} />
        </Router>
      </>
    );
  }
}

export default withAuth(App);
