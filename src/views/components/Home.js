/* eslint-disable no-console */
import React, { Component } from 'react';
import confessionService from '../../services/confessionService';
import CardConfession from './CardConfession';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allConfessions: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const allConfessions = await confessionService.getAllConfessions();
      this.setState({
        allConfessions,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderConfessions = () => {
    const { allConfessions } = this.state;
    console.log(this.props);
    return allConfessions.map(message => {
      const { description, category, _id, user, time, likesCounter } = message;
      return (
        <CardConfession
          key={_id}
          description={description}
          category={category}
          username={user.username}
          avatar={user.avatar}
          time={time}
          likesCounter={likesCounter}
          chat={user.allowsContact}
        />
      );
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>All confessions</h1>
        {loading ? 'loading...' : this.renderConfessions()}
      </div>
    );
  }
}

export default Home;
