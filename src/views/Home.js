/* eslint-disable no-console */
import React, { Component } from 'react';
import { withFlash } from '../Context/NotificationContext';
import confessionService from '../services/confessionService';
import CardConfession from './components/CardConfession';
import NavBar from './components/NavBar';
import PWAPrompt from 'react-ios-pwa-prompt'

import Addictions from '../data/images/Addictions.png';
import Work from '../data/images/Work.png';
import relationships from '../data/images/relationships.png';
import Family from '../data/images/Family.png';
import Studies from '../data/images/studies.png';
import Fantasies from '../data/images/Fantasies.png';
import Friends from '../data/images/Friends.png';
import Health from '../data/images/Health.png';
import Misc from '../data/images/Misc.png';
import Selfesteem from '../data/images/Selfesteem.png';
import Sex from '../data/images/Sex.png';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allConfessions: [],
      recentConfessions: [],
      loading: true,
      category: 'Recent',
      usesCategory: false,
      searchValue: '',
    };
  }

  async componentDidMount() {
    try {
      const allConfessions = await confessionService.getAllConfessions();
      this.setState({ allConfessions });
      this.filterByDate();
    } catch (error) {
      console.log(error);
    }
  }

  filterByDate = () => {
    const { allConfessions } = this.state;
    const recentConfessions = [];
    const now = new Date();
    allConfessions.forEach(confession => {
      const minAgo = (now - new Date(`${confession.created_at}`)) / 60000;
      if (minAgo < 1440 || (minAgo < 7200 && confession.isDestroyed === false)) {
        recentConfessions.push(confession);
      }
    });
    return this.setState({
      recentConfessions,
      loading: false,
    });
  };

  handleCategory = event => {
    const { allConfessions } = this.state;
    const recentConfessions = [];
    const now = new Date();
    allConfessions.forEach(confession => {
      const minAgo = (now - new Date(`${confession.created_at}`)) / 60000;
      if (minAgo < 1440 || (minAgo < 7200 && confession.isDestroyed === false)) {
        recentConfessions.push(confession);
      }
    });
    const category = event.target.name;
    const filteredConfessions = recentConfessions.filter(confession => confession.category.includes(category));
    this.setState({
      category,
      recentConfessions: filteredConfessions,
      usesCategory: true,
    });
  };

  handleRecent = () => {
    this.filterByDate();
    this.setState({
      usesCategory: !this.state.usesCategory,
      category: 'Recent',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value,
    });
  };

  renderConfessions = () => {
    const { recentConfessions, searchValue } = this.state;

    const filteredConfessions = recentConfessions.filter(confession => {
      const { description } = confession;
      return description.toLowerCase().search(searchValue.toLowerCase()) !== -1;
    });

    filteredConfessions.sort(function (a, b) {
      return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
    });

    return filteredConfessions.map(message => {
      const { description, category, _id, user, time, likes, created_at, reported } = message;
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
          reported={reported}
        />
      );
    });
  };

  render() {
    const { loading, category, usesCategory, searchValue } = this.state;
    return (
      <div className="container">
        <div className="content">
          <input
            className="search-bar"
            type="search"
            name="searchBar"
            value={searchValue}
            placeholder="Type a keyword to search..."
            onChange={this.handleSearch}
          />
          <h5>Most popular categories</h5>
          <div className="scroll">
            <ul className="scroll__list">
              <li className="scroll__item">
                <img
                  name="Family"
                  onClick={this.handleCategory}
                  src={Family}
                  alt="family category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Family</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Self-esteem"
                  onClick={this.handleCategory}
                  src={Selfesteem}
                  alt="self-esteem category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Self-esteem</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Addictions"
                  onClick={this.handleCategory}
                  src={Addictions}
                  alt="addictions category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Addictions</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Fantasies"
                  onClick={this.handleCategory}
                  src={Fantasies}
                  alt="fantasies category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Fantasies</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Health"
                  onClick={this.handleCategory}
                  src={Health}
                  alt="health category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Health</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Sex"
                  onClick={this.handleCategory}
                  src={Sex}
                  alt="sex category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Sex</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Work"
                  onClick={this.handleCategory}
                  src={Work}
                  alt="work category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Work</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Friends"
                  onClick={this.handleCategory}
                  src={Friends}
                  alt="misc category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Friends</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Miscellaneous"
                  onClick={this.handleCategory}
                  src={Misc}
                  alt="misc category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Misc.</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Relationships"
                  onClick={this.handleCategory}
                  src={relationships}
                  alt="relationships category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Relationships</p>
              </li>
              <li className="scroll__item">
                <img
                  name="Studies"
                  onClick={this.handleCategory}
                  src={Studies}
                  alt="studies category icon"
                  className="scroll__image"
                ></img>
                <p className="scroll__title">Studies</p>
              </li>
            </ul>
          </div>
          <h5>{category} confessions</h5>
          {usesCategory ? <p onClick={this.handleRecent}>View all</p> : <></>}
          {loading ? 'loading...' : this.renderConfessions()}
        </div>
        <NavBar />
        <PWAPrompt promptOnVisit={1} timesToShow={1} copyClosePrompt="Close" permanentlyHideOnDismiss={false} />
      </div>
    );
  }
}

export default withFlash(Home);
