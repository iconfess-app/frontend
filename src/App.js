import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import ChangePassword from './components/ChangePassword';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import EditProfile from './views/auth/EditProfile';

class App extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <>
        <button onClick={handleLogout}>logout</button>
        <Router>
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/private" component={PrivateView} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
          <PrivateRoute exact path="/changepw" component={ChangePassword} />
        </Router>
      </>
    );
  }
}

export default withAuth(App);
