import React, { Component } from 'react';
import authservice from '../../services/authService';

class ChangePassword extends Component {
  state = {
    password: '',
    hidden: true,
    passwordValid: true,
    formValid: false,
    errorMessage: {},
  };

  validateForm = () => {
    const { passwordValid } = this.state;
    this.setState({
      formValid: passwordValid,
    });
  };

  updatePassword = e => {
    const password = e.target.value;
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

  handlePassword = () => {
    const { hidden } = this.state;
    this.setState({
      hidden: !hidden,
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { password } = this.state;
    authservice.updatepassword({ password });
  };

  render() {
    const { password, hidden, passwordValid, errorMessage, formValid } = this.state;
    return (
      <>
        <div className="popup-content__close" onClick={this.props.onClose}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.01342 15.6167L8.6623 9.38334L15.3112 15.6167L16.6801 14.3333L10.0312 8.1L16.6801 1.86667L15.3112 0.583336L8.6623 6.81667L2.01342 0.583336L0.644531 1.86667L7.29341 8.1L0.644531 14.3333L2.01342 15.6167Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="popup-content__description">
          <h4>Set a new password</h4>
          <form onSubmit={this.handleFormSubmit} className="group-form">
            <input
              type={hidden ? 'password' : 'text'}
              name="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              value={password}
              onChange={this.updatePassword}
              className={passwordValid ? 'group-form__input' : 'group-form__input error-input'}
            />
            <span onClick={this.handlePassword} className="group-form__toggle-password">
              {hidden ? (
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.54206 10.8411L3.58879 9.79439C2.99065 9.27103 2.39252 8.74766 1.86916 8.07477C3.58879 5.98131 5.45794 4.71028 7.40187 4.41121C5.83178 4.85981 4.63551 6.28037 4.63551 8C4.63551 8.2243 4.63551 8.4486 4.71028 8.6729L6.35514 7.02804C6.57944 6.57944 6.95327 6.20561 7.40187 5.98131L10.3178 3.06542C9.71963 2.91589 9.04673 2.84112 8.4486 2.84112C5.53271 2.84112 2.69159 4.48598 0.373832 7.5514L0 8L0.373832 8.4486C1.04673 9.42056 1.79439 10.1682 2.54206 10.8411Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M13.2336 4.33645L16.5234 1.04673L15.4019 0L0.448598 14.9533L1.49533 16L5.08411 12.4112C6.20561 12.9346 7.3271 13.1589 8.4486 13.1589C11.3645 13.1589 14.2056 11.514 16.5234 8.4486L16.8972 8L16.5234 7.5514C15.5514 6.20561 14.3551 5.15888 13.2336 4.33645ZM10.6168 8C10.6168 9.27103 9.64486 10.243 8.37383 10.243C8.07477 10.243 7.7757 10.1682 7.47664 10.0935L10.3925 7.17757C10.5421 7.40187 10.6168 7.70093 10.6168 8ZM6.35514 11.1402C6.65421 11.3645 7.02804 11.514 7.40187 11.5888C7.02804 11.514 6.57944 11.4393 6.20561 11.2897L6.35514 11.1402ZM9.04673 11.6636C10.7664 11.3645 12.1122 9.79439 12.1122 8C12.1122 7.25234 11.8879 6.57944 11.514 6.05608L12.1122 5.45794C13.0841 6.05607 14.0561 6.95327 15.028 8.07477C13.1589 10.243 11.1402 11.4393 9.04673 11.6636Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                </svg>
              ) : (
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.48756 0C5.55822 0 2.704 1.62294 0.375556 4.72127L0 5.16389L0.375556 5.60651C2.704 8.70484 5.55822 10.3278 8.48756 10.3278C11.4169 10.3278 14.2711 8.70484 16.5996 5.60651L16.9 5.16389L16.5244 4.72127C14.196 1.62294 11.4169 0 8.48756 0ZM6.23422 5.16389C6.23422 3.9098 7.21067 2.95079 8.48756 2.95079C9.76444 2.95079 10.7409 3.9098 10.7409 5.16389C10.7409 6.41798 9.76444 7.37698 8.48756 7.37698C7.21067 7.37698 6.23422 6.41798 6.23422 5.16389ZM1.87778 5.16389C3.83067 2.80325 6.084 1.4754 8.41244 1.4754C6.38444 1.4754 4.732 3.1721 4.732 5.16389C4.732 7.00814 6.15911 8.5573 7.96178 8.77861C5.78356 8.63107 3.75556 7.37698 1.87778 5.16389ZM9.01333 8.77861C10.816 8.48353 12.2431 7.00814 12.2431 5.16389C12.2431 3.1721 10.5907 1.54917 8.56267 1.4754C10.8911 1.4754 13.0693 2.72948 15.0973 5.16389C13.2196 7.37698 11.1164 8.63107 9.01333 8.77861Z"
                      fill="#7E8186"
                    />
                  </svg>
                )}
            </span>
            {!passwordValid && (
              <div className="error-message">
                <p>{errorMessage.password}</p>
              </div>
            )}
            <button type="submit" value="Update" disabled={!formValid} className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default ChangePassword;
