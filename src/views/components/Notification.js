/* eslint-disable class-methods-use-this */
import React, { Component } from "react";

class Flash extends Component {
  state = {
    mounted: true,
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        mounted: false,
      })
    }, 5000);
  }

  handleClose = () => {
    this.setState({ mounted: false })
  }

  render() {
    const { type, message } = this.props;
    const { mounted } = this.state;
    return (
      <div className={`notification ${mounted ? 'slide-in' : 'slide-out'} ${type}`}> {message}<img className='close_notification' onClick={this.handleClose} alt='cross-icon' src='images/icon-close-black.png' /></div >
    )
  }
}

export default Flash;













