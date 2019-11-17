/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import chatService from '../services/chatService';
import authService from '../services/authService';

const ChatContext = createContext();

// eslint-disable-next-line prefer-destructuring
const Provider = ChatContext.Provider;

const ChatConsumer = ChatContext.Consumer;

export const withChat = (Comp) => {
  return class WithChat extends Component {

    render() {
      return (
        <ChatConsumer>
          {
            ({
              chats,
              loading,
              user,
              getChats,
              afterPostMessage,
            }) => <Comp {...this.props} loading={loading} chats={chats} user={user} getChats={getChats} afterPostMessage={afterPostMessage} />
          }
        </ChatConsumer>
      )

    }
  }
}

export default class ChatProvider extends Component {
  state = {
    chats: [],
    user: '',
    loading: true,
  }

  componentDidMount() {
    authService.me()
      .then((user) => {
        this.setState({
          user,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
        })
      });
  }

  getChats = () => {
    chatService.getChats()
      .then((chats) => {
        this.setState({
          chats: [...chats],
          loading: false,
        })
      }).catch(() => {
        this.setState({
          loading: true,
        })
      })
  }

  afterPostMessage = (message) => {
    this.setState({
      chats: [...this.state.chats, message[0]],
    })
  }

  render() {
    const { chats, user, loading } = this.state
    const { children } = this.props;
    if (loading) {
      return <div>Loading...</div>
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <Provider value={{
          loading,
          chats,
          user,
          getChats: this.getChats,
          afterPostMessage: this.afterPostMessage,
        }}>
          {children}
        </Provider>
      )
    }
  }
}
