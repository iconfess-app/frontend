/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { withAuth } from './Context/AuthContext';

class Chat extends Component {
  state = {
    chatMessage: "",
  }

  componentDidMount = () => {
    this.socket = socketIO('http://localhost:3001');
  }

  handleSearchChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, avatar } = this.props.user;
    const userId = this.props.user._id;
    const { chatMessage } = this.state;
    const nowTime = new Date();
    let type = 'Image';

    this.socket.emit('Input Chat Message', {
      chatMessage,
      userId,
      username,
      avatar,
      type,
      nowTime,
    });
    this.setState({ chatMessage: "" });

  }

  render() {
    return (
      <div>
        <button onClick={() => this.socket.emit('greet', 'Hi Cris I am sending you this from the frontend with sockets!')}>Click me</button>

        <h1>Real time chat</h1>

        <div className="chat-container">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.chatMessage} id='message' placeholder="Let's start talking" type="text" onChange={this.handleSearchChange}></input>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>

      </div>
    );
  }
}

export default withAuth(Chat);