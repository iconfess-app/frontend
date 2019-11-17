import React, { Component } from 'react';

class Splashscreen extends Component {
  state = {
    videoURL: '/images/iconfess-video.MP4',
  };

  render() {
    return (
      <div className="container">
        <video id="splash-video" loop autoPlay>
          <source src={this.state.videoURL} type="video/mp4" />
          <source src={this.state.videoURL} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

export default Splashscreen;
