import React, { Component } from 'react';
import Select from 'react-select';
import Popup from "reactjs-popup";
import ChangePassword from '../../components/ChangePassword';
import { withAuth } from "../../Context/AuthContext"

class EditProfile extends Component {
  state = {
    username: "",
    allowsContact: "",
    allowsLocation: "",
    avatar: "",
    lightMode: "",
    email: "",
  };

  componentDidMount = () => {
    const { username, allowsContact, allowsLocation, lightMode, avatar, email } = this.props.user;
    this.setState({
      username,
      allowsContact,
      allowsLocation,
      avatar,
      lightMode,
      email,
    });
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  handleSelect = (avatar) => {
    this.setState({ avatar: avatar.value });
  }


  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password, allowsContact, allowsLocation, lightMode, avatar, email } = this.state;
    this.props.handleUpdate({
      username,
      password,
      allowsContact,
      allowsLocation,
      lightMode,
      avatar,
      email,
    })
  }

  render() {
    const { username, allowsContact, allowsLocation, avatar, lightMode } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>
            <input type="checkbox" name="allowsContact" value={allowsContact} checked={allowsContact} onChange={this.handleChange} />
            Allow other users to contact me
          </label>
          <label>
            <input type="checkbox" name="allowsLocation" value={allowsLocation} checked={allowsLocation} onChange={this.handleChange} />
            Allow other users to know my location
          </label>
          <label>
            <input type="checkbox" name="lightMode" value={lightMode} checked={lightMode} onChange={this.handleChange} />
            Light mode
          </label>
          <label>
            Pick up your avatar:
          <Select
              name="avatar-select-form"
              value={avatar}
              onChange={this.handleSelect}
              options={[
                { value: 'avatar1', label: 'Avatar 1' },
                { value: 'avatar2', label: 'Avatar 2' },
                { value: 'avatar3', label: 'Avatar 3' },
                { value: 'avatar4', label: 'Avatar 4' },
                { value: 'avatar5', label: 'Avatar 5' },
                { value: 'avatar6', label: 'Avatar 6' },
              ]}
            />
          </label>
          <input type="submit" value="Update profile" />
        </form>
        <Popup trigger={<button>Change your password</button>} position="right center">
          <ChangePassword />
        </Popup>
      </div >
    )
  }
}

export default withAuth(EditProfile);
