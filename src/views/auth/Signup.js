import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    isOver16: false,
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    formValid: false,
    ageValid: false,
    errorMessage: {},
  };

  validateForm = () => {
    const { usernameValid, emailValid, passwordValid, ageValid } = this.state;
    this.setState({
      formValid: usernameValid && emailValid && passwordValid && ageValid,
    });
  };

  updateUsername = username => {
    this.setState({ username }, this.validateUsername);
  };

  validateUsername = () => {
    const { username } = this.state;
    let usernameValid = true;
    const errorMessage = { ...this.state.errorMessage };

    if (username.length < 3 || username.length > 15) {
      usernameValid = false;
      errorMessage.username = 'Must be between 3 and 15 characters long';
    }

    this.setState({ usernameValid, errorMessage }, this.validateForm);
  };

  updateEmail = email => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    const errorMessage = { ...this.state.errorMessage };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMessage.email = 'This is an invalid email format';
    }

    this.setState({ emailValid, errorMessage }, this.validateForm);
  };

  updatePassword = password => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    const errorMessage = { ...this.state.errorMessage };

    if (password.length < 6) {
      passwordValid = false;
      errorMessage.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMessage.password = 'Password must contain a number';
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMessage.password = 'Password must contain special character: !@#$%^&*';
    }

    this.setState({ passwordValid, errorMessage }, this.validateForm);
  };

  updateAge = event => {
    const isOver16 = event.currentTarget.checked;
    this.setState({ isOver16 }, this.validateAge);
  };

  validateAge = () => {
    const { isOver16 } = this.state;
    let ageValid = true;
    const errorMessage = { ...this.state.errorMessage };

    // checks if is over 16
    if (!isOver16) {
      ageValid = false;
      errorMessage.isOver16 = 'You must be over 16 years old';
    }

    this.setState({ ageValid, errorMessage }, this.validateForm);
  };

  // handleChange = event => {
  //   const { target } = event;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const { name } = target;
  //   this.setState({ [name]: value });
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email, isOver16 } = this.state;
    this.props.handleSignup({
      username,
      password,
      email,
      isOver16,
    });
  };

  render() {
    const {
      username,
      password,
      email,
      isOver16,
      formValid,
      usernameValid,
      passwordValid,
      emailValid,
      ageValid,
      errorMessage,
    } = this.state;
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => this.updateUsername(e.target.value)}
            required
          />
          {!usernameValid && <div style={{ color: 'red' }}>{errorMessage.username}</div>}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => this.updatePassword(e.target.value)}
            required
          />
          {!passwordValid && <div style={{ color: 'red' }}>{errorMessage.password}</div>}
          <label>E-mail:</label>
          <input type="email" name="email" value={email} onChange={e => this.updateEmail(e.target.value)} />
          {!emailValid && <div style={{ color: 'red' }}>{errorMessage.email}</div>}
          <label>
            <input type="checkbox" name="isOver16" value={isOver16} onChange={e => this.updateAge(e)} />I am over 16
          </label>
          {!ageValid && <div style={{ color: 'red' }}>{errorMessage.isOver16}</div>}
          <input type="submit" value="Signup" disabled={!formValid} />
        </form>
        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
