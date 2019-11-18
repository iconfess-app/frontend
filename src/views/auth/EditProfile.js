import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
import { withAuth } from '../../Context/AuthContext';
import { withFlash } from '../../Context/NotificationContext';
import NavBar from '../components/NavBar';
import avatars from '../../data/avatars.json';

class EditProfile extends Component {
  state = {
    username: '',
    allowsContact: '',
    allowsLocation: '',
    avatar: null,
    lightMode: '',
    email: '',
    showAvatars: false,
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
  };

  handleChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  };

  handleSelect = event => {
    console.log(event.target.src);
    this.setState({ avatar: event.target.src });
  };

  toggleAvatars = () => {
    const avatarsList = this.state.showAvatars;
    this.setState({
      showAvatars: !avatarsList,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, allowsContact, allowsLocation, lightMode, avatar, email } = this.state;
    try {
      this.props.handleUpdate({
        username,
        password,
        allowsContact,
        allowsLocation,
        lightMode,
        avatar,
        email,
      });
      this.props.handleFlash('Your profile is updated', 'success');
      this.redirect();
    } catch (error) {
      this.props.handleFlash('Oops! Something went wrong. Try again', 'error');
    }
  };

  redirect = () => {
    setTimeout(() => {
      this.props.history.push('/');
    }, 2000)
  }

  render() {
    const { username, allowsContact, allowsLocation, lightMode, showAvatars, avatar } = this.state;
    const goBack = () => this.props.history.goBack();
    const { handleLogout } = this.props;
    return (
      <div className="container">
        <div className="content">
          <div className="top-header">
            <span onClick={goBack}>
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2624 19.1765L4.36879 10.812L13.2624 2.29805L11.078 0.206909L0 10.812L11.078 21.2677L13.2624 19.1765Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
            <h3>Edit profile</h3>
            <div className="top-header__logout">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleLogout}
              >
                <path
                  d="M13 1H4C2.3 1 1 2.3 1 4V20C1 21.7 2.3 23 4 23H13C14.7 23 16 21.7 16 20V15.1H14V20C14 20.6 13.6 21 13 21H4C3.4 21 3 20.6 3 20V4C3 3.4 3.4 3 4 3H13C13.6 3 14 3.4 14 4V9H16V4C16 2.3 14.7 1 13 1Z"
                  fill="#FF7F57"
                />
                <path d="M8.6 11H19.2L16.9 8.7L18.3 7.3L23 12L18.3 16.7L16.9 15.3L19.2 13H8.6V11Z" fill="#FF7F57" />
              </svg>
              <span className="top-header__logout-text">logout</span>
            </div>
          </div>
          <div className="edit-intro">
            <h2>
              Welcome back <span className="edit-intro__username">{username}</span>
            </h2>
            <div className="edit-intro__avatar">
              <img src={avatar} className="edit-intro__avatar__selected" alt="Avatar1" />
            </div>
            <div className="edit-intro__changeAvatar">
              <button onClick={this.toggleAvatars} className="red-link">
                Change avatar
              </button>
            </div>
          </div>
          {showAvatars && (
            <div className="avatar-container">
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar1} alt="avatar1" name="avatar1" />
              </div>
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar2} alt="avatar2" name="avatar2" />
              </div>
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar3} alt="avatar3" name="avatar3" />
              </div>
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar4} alt="avatar4" name="avatar4" />
              </div>
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar5} alt="avatar5" name="avatar5" />
              </div>
              <div className="avatar-container__item" onClick={this.handleSelect}>
                <img src={avatars.avatar6} alt="avatar6" name="avatar6" />
              </div>
            </div>
          )}

          <form onSubmit={this.handleFormSubmit} className="group-form">
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              className="group-form__input"
            />
            <input
              type="password"
              name="password"
              value="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              onChange={this.handleChange}
              className="group-form__input"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
            <Popup
              overlayClassName="overlay"
              trigger={<button className="card__todelete group-form__change-password">Change your password</button>}
              position="center center"
            >
              {close => <ChangePassword onClose={close} />}
            </Popup>
            <div className="divider"></div>
            <div className="group-form__toggle-options">
              <span className="group-form__toggle-text">Allow other users to contact me</span>
              <label className="group-form__toggle">
                <input
                  type="checkbox"
                  name="allowsContact"
                  value={allowsContact}
                  checked={allowsContact}
                  onChange={this.handleChange}
                />
                <span className="group-form__toggle__slider"></span>
              </label>
            </div>
            <div className="group-form__toggle-options">
              <span className="group-form__toggle-text">Allow other users to know my location</span>
              <label className="group-form__toggle">
                <input
                  type="checkbox"
                  name="allowsLocation"
                  value={allowsLocation}
                  checked={allowsLocation}
                  onChange={this.handleChange}
                />
                <span className="group-form__toggle__slider"></span>
              </label>
            </div>
            <div className="group-form__toggle-options">
              <span className="group-form__toggle-text">Light mode</span>
              <label className="group-form__toggle">
                <input
                  type="checkbox"
                  name="lightMode"
                  value={lightMode}
                  checked={lightMode}
                  onChange={this.handleChange}
                />
                <span className="group-form__toggle__slider"></span>
              </label>
            </div>
            <button type="submit" value="Update profile" className="btn btn-primary top-spacer-large">
              Update profile
            </button>
            <Link to="/">
              <button value="Cancel updating" className="btn btn-outlined top-spacer-large">
                Cancel
              </button>
            </Link>
          </form>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default withAuth(withFlash(EditProfile));
