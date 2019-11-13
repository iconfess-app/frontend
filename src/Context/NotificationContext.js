/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';

const NotificationContext = createContext();

const NotificationProvider = NotificationContext.Provider;

const FlashConsumer = NotificationContext.Consumer;

export default class FlashProvider extends Component {
  state = {
    message: '',
    type: '',
  }

  handleFlash = (message) => { }

  handleHide = () => { }

  render() {
    return (
      <NotificationProvider value={this.state}>
        <div className="flash">
          <div className={`${this.state.type}`}>
            <p>{this.state.message}</p>
            {this.props.children}
          </div>
        </div>
      </NotificationProvider>
    )
  }
}

export const withFlash = (Comp) => {
  return class WithFlash extends Component {

    render() {
      return (
        <FlashConsumer>
          {
            ({
              handleShow,
              handleHide
            }) => <Comp {...this.props} handleShow={handleShow} handleHide={handleHide} />
          }
        </FlashConsumer>
      )
    }
  }
}