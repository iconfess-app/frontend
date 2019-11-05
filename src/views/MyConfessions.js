/* eslint-disable no-console */
import React, { Component } from 'react';
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
      this.setState({
        myConfessions,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = id => {
    this.setState({
      loading: true,
    });
    confessionService.deleteConfession(id).then(() => {
      this.updateConfessionList();
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
    const { myConfessions } = this.state;
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
