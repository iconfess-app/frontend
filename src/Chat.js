/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { withFlash } from './Context/NotificationContext';
import { withChat } from './Context/ChatContext';
import NavBar from './views/components/NavBar';

class Chat extends Component {
  state = {
    chatMessage: '',
  };

  componentDidMount = () => {
    this.socket = socketIO(process.env.REACT_APP_BACKEND_BASE_URL);
    this.props.getChats();
    this.socket.on('Output Chat Message', messageFromBackend => {
      this.props.afterPostMessage(messageFromBackend);
    });
    this.props.handleFlash('Messages on this chat will self-destroy in 15 minutes 🤫', 'regular');
  };

  componentDidUpdate = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleSearchChange = e => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, avatar } = this.props.user;
    const userId = this.props.user._id;
    const { chatMessage } = this.state;
    const nowTime = new Date();
    let type = 'Text';
    const message = { chatMessage, userId, username, avatar, type, nowTime };
    this.socket.emit('Input Chat Message', message);
    this.setState({ chatMessage: '' });
  };

  render() {
    const { chats } = this.props;
    console.log(this.props);
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
              return (
                <div key={index} className="chat-bubble">
                  <div className="chat-bubble-top">
                    <img className="chat-avatar" src={chat.sender.avatar} alt="user icon" />
                  </div>
                  <div className="chat-bubble-content">
                    <p className="chat-bubble-content__user">@{chat.sender.username}</p>
                    <p>{chat.message}</p>
                  </div>
                </div>
              );
            })}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <form onSubmit={this.handleSubmit} className="chat-form">
            <input
              value={this.state.chatMessage}
              id="message"
              placeholder="Let's start talking"
              type="text"
              onChange={this.handleSearchChange}
              className="chat-form__chatinput"
            ></input>
            <button type="submit" className="chat-form__btn">
              <svg width="20" height="19" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.72141 13.0106L4.81427 13.3749L6.81784 10.7641L10.7036 13.557L11.675 13.1927L14.1036 1.04986L13.2536 0.321289L0.44284 5.17843L0.321411 6.27129L3.72141 8.51772V13.0106ZM4.9357 11.1891V8.457L10.0357 4.32843L4.9357 11.1891ZM10.5821 11.9784L7.4857 9.79272L12.3428 3.29629L10.5821 11.9784ZM1.9607 5.907L9.97498 2.87129L4.26784 7.42486L1.9607 5.907Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default withFlash(withChat(Chat));
