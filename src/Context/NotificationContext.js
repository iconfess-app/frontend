/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import Flash from '../views/components/Notification';

const NotificationContext = createContext();

const NotificationProvider = NotificationContext.Provider;

const NotificationConsumer = NotificationContext.Consumer;

export const withFlash = (Comp) => {
  return class WithFlash extends Component {

    render() {
      return (
        <NotificationConsumer>
          {
            ({
              message,
              type,
              handleShow,
              handleHide
            }) => <Comp {...this.props} message={message} type={type} handleShow={handleShow} handleHide={handleHide} />
          }
        </NotificationConsumer>
      )
    }
  }
}

export default class FlashProvider extends Component {
  state = {
    message: '',
    type: '',
  }

  handleFlash = (message, type) => {
    this.setState({
      message,
      type,
    })
  }

  handleHide = () => {
    setTimeout(() => {
      console.log('Setting time out');
    }, 3000);
  }

  render() {
    const { message, type } = this.state;
    const { children } = this.props;
    return (
      <NotificationProvider value={{
        message,
        type,
        handleFlash: this.handleFlash,
        handlHide: this.handleHide,
      }}>
        <Flash className={type}>{message}</Flash>
        {children}
      </NotificationProvider>
    )
  }
}

