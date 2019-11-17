/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { withFlash } from './Context/NotificationContext';
import { withChat } from './Context/ChatContext';
import NavBar from './views/components/NavBar';

class Chat extends Component {
  state = {
    chatMessage: "",
  }

  componentDidMount = () => {
    this.socket = socketIO(process.env.REACT_APP_BACKEND_BASE_URL);
    this.props.getChats();
    this.socket.on('Output Chat Message', messageFromBackend => {
      this.props.afterPostMessage(messageFromBackend);
    });
    this.props.handleFlash('Messages on this chat will self-destroy in 15 minutes 🤫', 'regular');
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
    const { chats } = this.props;
    const goBack = () => this.props.history.goBack();
    return (
      <div className="container chat">
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
            <h3>Chat room</h3>
          </div>
          <div className="chat-container">
            {chats.map((chat, index) => {
              return <div key={index} className="chat-bubble">
                <div className="chat-bubble-top"><img className="chat-avatar" src={chat.sender.avatar} alt="user icon"></img> @{chat.sender.username}</div>
                <p className="chat-bubble-content">{chat.message}</p>
              </div>
            })}
            <div ref={el => { this.messagesEnd = el; }} />
          </div>
          <div className="chat-input-section">
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.chatMessage} id='message' placeholder="Let's start talking" type="text" onChange={this.handleSearchChange}></input>
              <button type="submit" className="btn-chat"><img src="images/chat-button.png" alt="chat button" /></button>
            </form>
          </div>
        </div>
        <NavBar />
      </div >
    );
  }
}

export default withFlash(withChat(Chat));