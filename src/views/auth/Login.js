import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleLogin({
      email,
      password
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={this.handleChange} />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default withAuth(Login);