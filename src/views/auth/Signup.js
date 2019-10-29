import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authservice from '../../services/authService';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    isOver16: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    const val = event.target.checked;
    const { name } = event.target;
    this.setState({ [name]: val });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, isOver16 } = this.state;
    authservice.signup({
      username,
      password,
      email,
      isOver16,
    });
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
            <input type="checkbox" name="over16" value={isOver16} onChange={this.handleClick} />
            I am over 16
          </label>
          {/* <label>
            <input type="checkbox" name="allowsContact" value={allowsContact} onChange={this.handleClick} />
            Allow other users to contact me
          </label>
          <label>
            <input type="checkbox" name="allowsLocation" value={allowsLocation} onChange={this.handleClick} />
            Allow other users to know my location
          </label>
          <label>
            <input type="checkbox" name="darkMode" checked value={darkMode} onChange={this.handleClick} />
            Dark mode
          </label> */}
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default Signup;
