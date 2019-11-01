import React, { Component } from 'react';
import authservice from '../services/authService';

class ChangePassword extends Component {
  state = {
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { password } = this.state;
    authservice.updatepassword({ password });
  }

  render() {
    const { password } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Password:</label>
        <input type="password" name="password" placeholder="********" value={password} onChange={this.handleChange} />
        <input type="submit" value="Update" />
      </form>
    );
  }
}

export default ChangePassword;