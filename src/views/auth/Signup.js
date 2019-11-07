import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    isOver16: false,
  };

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, isOver16 } = this.state;
    this.props.handleSignup({
      username,
      password,
      email,
      isOver16,
    })
  }

  render() {
    const { username, password, email, isOver16 } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <label>E-mail:</label>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          <label>
            <input type="checkbox" name="isOver16" value={isOver16} onChange={this.handleChange} />
            I am over 16
          </label>
          <input type="submit" value="Signup" />
        </form>
        <p>Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    )
  }
}

export default withAuth(Signup);
