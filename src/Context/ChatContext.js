/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import chatService from '../services/chatService';
import authService from '../services/authService';

const ChatContext = createContext();

// eslint-disable-next-line prefer-destructuring
const Provider = ChatContext.Provider;

const ChatConsumer = ChatContext.Consumer;

export const withChat = Comp => {
  return class WithChat extends Component {
    render() {
      return (
        <ChatConsumer>
          {({ chats, loading, user, getChats, afterPostMessage }) => (
            <Comp
              {...this.props}
              loading={loading}
              chats={chats}
              user={user}
              getChats={getChats}
              afterPostMessage={afterPostMessage}
            />
          )}
        </ChatConsumer>
      );
    }
  };
};

export default class ChatProvider extends Component {
  state = {
    chats: [],
    user: '',
    loading: true,
  };

  componentDidMount() {
    authService
      .me()
      .then(user => {
        this.setState({
          user,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  getChats = () => {
    chatService
      .getChats()
      .then(chats => {
        this.setState({
          chats: [...chats],
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: true,
        });
      });
  };

  afterPostMessage = message => {
    this.setState({
      chats: [...this.state.chats, message[0]],
    });
  };

  render() {
    const { chats, user, loading } = this.state;
    const { children } = this.props;
    if (loading) {
      return (
        <div className="content loading">
          <h2 className="loading__title">loading</h2>
          <div className="loading__icon">
            <svg width="60" height="88" viewBox="0 0 60 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.38854 88C4.70064 88 4.01274 87.8847 3.36306 87.6156C1.3758 86.8082 0.0764331 84.8475 0.0764331 82.6946L0 72.007L0.0382166 48.9402C0.0382166 42.2123 3.01911 35.9458 8.25478 31.7554C9.47771 30.7558 11.2739 30.948 12.2675 32.2167C13.2611 33.4469 13.0701 35.2538 11.8089 36.2534C7.94904 39.329 5.73248 43.9808 5.73248 48.9402L5.69427 72.007L5.73248 81.7335L19.8726 67.509C20.4076 66.9707 21.1338 66.6632 21.8981 66.6632H38.1019C47.0064 66.6632 54.2675 59.3587 54.2675 50.4011V48.9786C54.2675 40.021 47.0064 32.7165 38.1019 32.7165H30.0382C19.7197 32.7165 11.3503 25.3735 11.3503 16.3775C11.3503 7.38139 19.7197 0 30.0382 0C40.3567 0 48.7643 7.34294 48.7643 16.339V17.4155C48.7643 18.9917 47.5032 20.2988 45.8981 20.2988C44.293 20.2988 43.0318 19.0301 43.0318 17.4155V16.339C43.0318 10.4954 37.1847 5.72827 30.0382 5.72827C22.8917 5.72827 17.0446 10.4954 17.0446 16.339C17.0446 22.1826 22.8917 26.9498 30.0382 26.9498H38.1401C50.2166 26.9498 60 36.8301 60 48.9402V50.3626C60 62.5111 50.1783 72.353 38.1401 72.353H23.0828L9.13376 86.3853C8.10191 87.4618 6.76433 88 5.38854 88Z"
                fill="#FF7F57"
              />
              <path
                d="M19.414 45.9799C17.1975 45.9799 15.4013 47.7868 15.4013 50.0166C15.4013 52.2464 17.1975 54.0533 19.414 54.0533C21.6306 54.0533 23.4268 52.2464 23.4268 50.0166C23.4268 47.7868 21.6306 45.9799 19.414 45.9799Z"
                fill="#FF7F57"
              />
              <path
                d="M30 45.9799C27.7834 45.9799 25.9873 47.7868 25.9873 50.0166C25.9873 52.2464 27.7834 54.0533 30 54.0533C32.2166 54.0533 34.0127 52.2464 34.0127 50.0166C34.0127 47.7868 32.2166 45.9799 30 45.9799Z"
                fill="#FF7F57"
              />
              <path
                d="M40.586 45.9799C38.3694 45.9799 36.5732 47.7868 36.5732 50.0166C36.5732 52.2464 38.3694 54.0533 40.586 54.0533C42.8025 54.0533 44.5987 52.2464 44.5987 50.0166C44.5605 47.7868 42.7643 45.9799 40.586 45.9799Z"
                fill="#FF7F57"
              />
            </svg>
          </div>
        </div>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <Provider
          value={{
            loading,
            chats,
            user,
            getChats: this.getChats,
            afterPostMessage: this.afterPostMessage,
          }}
        >
          {children}
        </Provider>
      );
    }
  }
}
