/* eslint-disable no-console */
import React, { Component } from 'react';
import authService from '../services/authService';
import confessionService from '../services/confessionService';
import CardMyConfessions from './components/CardMyConfession';

class myConfessionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myConfessions: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const myConfessions = await confessionService.getMyConfessions();
      console.log(myConfessions);
      this.setState({
        myConfessions,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  user = () => {
    return authService.me();
  };

  renderMyConfessions = () => {
    const { myConfessions } = this.state;
    return myConfessions.map(message => {
      const { description, category, _id, time, likesCounter, date } = message;
      return (
        <CardMyConfessions
          key={_id}
          description={description}
          category={category}
          time={time}
          likesCounter={likesCounter}
          date={date}
          id={_id}
        />
      );
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>My confessions</h1>
        {loading ? 'loading...' : this.renderMyConfessions()}
      </div>
    );
  }
}

export default myConfessionsPage;
