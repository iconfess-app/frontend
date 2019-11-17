/* eslint-disable no-console */
import React, { Component } from 'react';
import { withFlash } from '../Context/NotificationContext';
import confessionService from '../services/confessionService';
import CardMyConfessions from './components/CardMyConfession';
import NavBar from './components/NavBar';
import Loading from './components/Loading';

class myConfessionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myConfessions: [],
      loading: true,
      isEncoded: true,
    };
  }

  async componentDidMount() {
    try {
      const myConfessions = await confessionService.getMyConfessions();
      this.setState({
        myConfessions,
        loading: false,
      });
    } catch (error) {
      this.props.handleFlash('Check your internet connection', 'error');
    }
  }

  handleDelete = id => {
    this.setState({
      loading: true,
    });
    confessionService.deleteConfession(id).then(() => {
      this.updateConfessionList();
    });
    this.props.handleFlash('Confession deleted', 'success');
  };

  handleEncoded = () => {
    const { isEncoded } = this.state;
    this.setState({
      isEncoded: !isEncoded,
    });
  };

  async updateConfessionList() {
    const updatedConfessions = await confessionService.getMyConfessions();
    this.setState({
      myConfessions: updatedConfessions,
      loading: false,
    });
  }

  renderMyConfessions = () => {
    const { myConfessions, isEncoded } = this.state;
    return myConfessions.map(message => {
      const { description, category, _id, time, likes, date } = message;
      return (
        <CardMyConfessions
          key={_id}
          description={description}
          categories={category}
          time={time}
          likes={likes}
          date={date}
          id={_id}
          onDelete={() => this.handleDelete(_id)}
          encoded={isEncoded}
        />
      );
    });
  };

  render() {
    const { loading } = this.state;
    const goBack = () => this.props.history.goBack();
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
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
                <h3>My confessions</h3>
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={this.handleEncoded}
                >
                  <path
                    d="M19.3 0L7.8 11.5C7 11 6 10.7 5 10.7C2.2 10.7 0 12.9 0 15.7C0 18.5 2.2 20.7 5 20.7C7.8 20.7 10 18.5 10 15.7C10 14.7 9.7 13.7 9.2 12.9L15 7.1L17.3 9.4L18.7 8L16.4 5.7L18 4.1L20.3 6.4L21.7 5L19.4 2.7L20.7 1.4L19.3 0ZM5 18.7C3.3 18.7 2 17.4 2 15.7C2 14 3.3 12.7 5 12.7C6.7 12.7 8 14 8 15.7C8 17.4 6.7 18.7 5 18.7Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
              <div className="confessions">{this.renderMyConfessions()}</div>
            </div>
            <NavBar />
          </div>
        )}
      </>
    );
  }
}

export default withFlash(myConfessionsPage);
