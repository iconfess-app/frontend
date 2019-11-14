import React, { Component } from "react";

class Flash extends Component {

  componentDidMount = () => {
    setTimeout(() => {
      document.getElementsByClassName('notification').
       }, 3000);
  }

  render() {
    return (
      <div className="notification">{this.props.children}</div>
    )
  }
}

export default Flash;













