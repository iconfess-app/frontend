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
              notifications,
              handleFlash,
            }) => <Comp {...this.props} notifications={notifications} handleFlash={handleFlash}
              />
          }
        </NotificationConsumer>
      )
    }
  }
}

export default class FlashProvider extends Component {
  state = {
    notifications: [
      {
        message: [],
        type: [],
      }
    ],
  }

  handleFlash = (message, type) => {
    const newFlash = { message, type };
    this.setState({
      notifications: [...this.state.notifications, newFlash],
    })
  }

  render() {
    console.log(this.state.notifications);
    const { notifications } = this.state;
    const { children } = this.props;
    return (
      <NotificationProvider value={{
        notifications,
        handleFlash: this.handleFlash,
      }}>
        <div className="notification_container">
          {notifications[0].message !== '' &&
            notifications.map((flash, index) => {
              return <Flash key={index} message={flash.message} type={flash.type} />
            })
          }
        </div>
        {children}
      </NotificationProvider>
    )
  }
}


