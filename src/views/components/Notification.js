/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

class Flash extends Component {
  state = {
    mounted: true,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        mounted: false,
      });
    }, 5000);
  };

  handleClose = () => {
    this.setState({ mounted: false });
  };

  render() {
    const { type, message } = this.props;
    const { mounted } = this.state;
    return (
      <div className={`notification ${mounted ? 'slide-in' : 'slide-out'} ${type}`}>
        {' '}
        {message}
        {/* <img
          className="close_notification"
          onClick={this.handleClose}
          alt="cross-icon"
          src="images/icon-close-black.png"
        /> */}
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="close_notification"
          onClick={this.handleClose}
          alt="cross-icon"
        >
          <path d="M2.01342 15.6167L8.6623 9.38334L15.3112 15.6167L16.6801 14.3333L10.0312 8.1L16.6801 1.86667L15.3112 0.583336L8.6623 6.81667L2.01342 0.583336L0.644531 1.86667L7.29341 8.1L0.644531 14.3333L2.01342 15.6167Z" />
        </svg>
      </div>
    );
  }
}

export default Flash;
