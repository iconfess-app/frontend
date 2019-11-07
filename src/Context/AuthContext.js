/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

const Provider = AuthContext.Provider;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {

    render() {
      return (
        <AuthConsumer>
          {
            ({ isLoading,
              isLoggedin,
              user,
              handleSignup,
              handleLogin,
              handleLogout,
              handleUpdate,
            }) => <Comp {...this.props} isLoading={isLoading} isLoggedin={isLoggedin} user={user} handleSignup={handleSignup} handleLogin={handleLogin} handleLogout={handleLogout} handleUpdate={handleUpdate} />
          }
        </AuthConsumer>
      )

    }
  }
}

export default class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true,
  }

  componentDidMount() {
    authService.me()
      .then((user) => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false,
        })

        console.log('me', user);
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleSignup = (user) => {
    authService.signup(user)
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedin: true,
          user,
        })
      }).catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        })
      })
  }

  handleLogin = (user) => {
    authService.login(user)
      .then((loggedUser) => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleLogout = () => {
    this.setState({
      isLoading: true,
    })
    authService.logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        })
      })
  }

  handleUpdate = (user) => {
    authService.edit(user)
      .then(() => {
        this.setState({
          isLoading: false,
          isLoggedin: true,
          user,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        })
      })
  }

  render() {
    const { isLoading, isLoggedin, user } = this.state
    const { children } = this.props;
    if (isLoading) {
      return <div>Loading...</div>
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <Provider value={{
          isLoading,
          isLoggedin,
          user,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleUpdate: this.handleUpdate,
        }}>
          {children}
        </Provider>
      )
    }
  }
}
