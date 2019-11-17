/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { withAuth } from './Context/AuthContext';
import { withChat } from './Context/ChatContext';
//import ChatBubble from './views/components/ChatBubble';

class Chat extends Component {
  state = {
    chatMessage: "",
  }

  componentDidMount = () => {
    this.socket = socketIO('http://localhost:3001');
    this.props.getChats();
    this.socket.on('Output Chat Message', messageFromBackend => {
      this.props.afterPostMessage(messageFromBackend);
    });
  }

  componentDidUpdate = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
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
    let type = 'Text';
    const message = { chatMessage, userId, username, avatar, type, nowTime };
    this.socket.emit('Input Chat Message', message);
    this.setState({ chatMessage: "" })
  }

  render() {
    console.log(this.props);
    const { chats } = this.props;
    return (
      <div>
        <button onClick={() => this.socket.emit('greet', 'Hi Cris I am sending you this from the frontend with sockets!')}>Click me</button>

        <h1>Real time chat</h1>

        <div className="chat-container">
          {chats.map((chat, index) => {
            return <div key={index} className="chat-bubble">
              <p>From: <img className="chat-avatar" src={chat.sender.avatar} alt="user icon"></img> {chat.sender.username}</p>
              <p>{chat.message}</p>
            </div>
          })}
          <div ref={el => { this.messagesEnd = el; }} />
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.chatMessage} id='message' placeholder="Let's start talking" type="text" onChange={this.handleSearchChange}></input>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>

      </div >
    );
  }
}

export default withAuth(withChat(Chat));