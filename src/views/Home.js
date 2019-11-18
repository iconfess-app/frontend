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

import Loading from './components/Loading';

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

    filteredConfessions.sort(function(a, b) {
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
    console.log(this.state.category);
    const categories = [
      'Family',
      'Addictions',
      'Fantasies',
      'Friends',
      'Health',
      'Misc',
      'Self-esteem',
      'Sex',
      'Work',
      'Relationships',
      'Studies',
    ];
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="content">
              <input
                className="searchbar"
                type="search"
                name="searchBar"
                value={searchValue}
                placeholder="Type a keyword to search..."
                onChange={this.handleSearch}
              />
              <h5>Most popular categories</h5>
              <div className="scroll">
                <ul className="scroll__list">
                  {categories.map(categoryFilter => {
                    return (
                      <li key={categoryFilter} className="scroll__item">
                        <img
                          src={`/images/${categoryFilter}.png`}
                          alt={`${categoryFilter} category icon`}
                          name={categoryFilter}
                          onClick={this.handleCategory}
                          className={category === categoryFilter ? 'scroll__image--selected' : 'scroll__image'}
                        />
                        <p className={category === categoryFilter ? 'scroll__title--selected' : 'scroll__title'}>
                          {categoryFilter}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="filtered-categories-title">
                <h5>{category} confessions</h5>
                {usesCategory ? (
                  <span onClick={this.handleRecent} className="filtered-categories-title__filter">
                    View all
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="confessions">{this.renderConfessions()}</div>
            </div>
            <NavBar />
          <PWAPrompt promptOnVisit={1} timesToShow={1} copyClosePrompt="Close" permanentlyHideOnDismiss={false} />
          </div>
        )}
      </>
    );
  }
}

export default withFlash(Home);
