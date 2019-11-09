/* eslint-disable no-console */
import React, { Component } from 'react';
import confessionService from '../../services/confessionService';
import CardConfession from './CardConfession';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentConfessions: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const allConfessions = await confessionService.getAllConfessions();
      const recentConfessions = [];
      const now = new Date();
      allConfessions.forEach((confession) => {
        const minAgo = (now - new Date(`${confession.created_at}`)) / 60000;
        if (minAgo < 1140 || ((minAgo < 7200) && (confession.isDestroyed === false))) {
          recentConfessions.push(confession);
        }
      });
      this.setState({
        recentConfessions,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderConfessions = () => {
    const { recentConfessions } = this.state;
    return recentConfessions.map(message => {
      const { description, category, _id, user, time, likes, created_at } = message;
      return (
        <CardConfession
          key={_id}
          description={description}
          categories={category}
          username={user.username}
          avatar={user.avatar}
          time={time}
          likes={likes}
          chat={user.allowsContact}
          id={_id}
          created={created_at}
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
