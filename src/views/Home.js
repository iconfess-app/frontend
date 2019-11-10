/* eslint-disable no-console */
import React, { Component } from 'react';
import confessionService from '../services/confessionService';
import CardConfession from './components/CardConfession';
import NavBar from './components/NavBar';

// CSS FILE WITH VERY BASIC FEATURES DONE ONLY TO TEST, STYLES MUST BE ADDED IN THE SASS FILE
import './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allConfessions: [],
      recentConfessions: [],
      loading: true,
      category: "Recent",
      usesCategory: false,
      searchValue: "",
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
    allConfessions.forEach((confession) => {
      const minAgo = (now - new Date(`${confession.created_at}`)) / 60000;
      if (minAgo < 1440 || ((minAgo < 7200) && (confession.isDestroyed === false))) {
        recentConfessions.push(confession);
      }
    });
    return this.setState({
      recentConfessions,
      loading: false,
    });
  }

  handleCategory = (event) => {
    const { allConfessions } = this.state;
    const recentConfessions = [];
    const now = new Date();
    allConfessions.forEach((confession) => {
      const minAgo = (now - new Date(`${confession.created_at}`)) / 60000;
      if (minAgo < 1440 || ((minAgo < 7200) && (confession.isDestroyed === false))) {
        recentConfessions.push(confession);
      }
    });
    const category = event.target.name;
    const filteredConfessions = recentConfessions.filter(confession => confession.category.includes(category));
    this.setState({
      category,
      recentConfessions: filteredConfessions,
      usesCategory: true,
    })
  }

  handleRecent = () => {
    this.filterByDate();
    this.setState({
      usesCategory: !this.state.usesCategory,
      category: 'Recent',
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value,
    });
  }

  renderConfessions = () => {
    const { recentConfessions, searchValue } = this.state;

    const filteredConfessions = recentConfessions.filter(confession => {
      const { description } = confession;
      return description.toLowerCase().search(searchValue.toLowerCase()) !== -1;
    });

    filteredConfessions.sort(function (a, b) {
      return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
    });

    return filteredConfessions.map(message => {
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
    const { loading, category, usesCategory, searchValue } = this.state;
    return (
      <div className="container">
        <input className="search-bar" type="text" name="searchBar" value={searchValue} placeholder="Type a keyword to search..." onChange={this.handleSearch} />
        <h3>Most popular categories</h3>
        <div className="scroll">
          <ul className="hscroll">
            {/* ========== STUDIES & RELATIONSHIPS IMAGES MISSING ========= */}
            <li className="item"><img name="Family" onClick={this.handleCategory} src="/images/family.png" alt="family category icon"></img><p>Family</p></li>
            <li className="item"><img name="Self-esteem" onClick={this.handleCategory} src="/images/self-esteem.png" alt="self-esteem category icon"></img><p>Self-esteem</p></li>
            <li className="item"><img name="Addictions" onClick={this.handleCategory} src="/images/addictions.png" alt="addictions category icon"></img><p>Addictions</p></li>
            <li className="item"><img name="Fantasies" onClick={this.handleCategory} src="/images/fantasies.png" alt="fantasies category icon"></img><p>Fantasies</p></li>
            <li className="item"><img name="Health" onClick={this.handleCategory} src="/images/health.png" alt="health category icon"></img><p>Health</p></li>
            <li className="item"><img name="Sex" onClick={this.handleCategory} src="/images/sex.png" alt="sex category icon"></img><p>Sex</p></li>
            <li className="item"><img name="Work" onClick={this.handleCategory} src="/images/work.png" alt="work category icon"></img><p>Work</p></li>
            <li className="item"><img name="Friends" onClick={this.handleCategory} src="/images/friends.png" alt="misc category icon"></img><p>Friends</p></li>
            <li className="item"><img name="Miscellaneous" onClick={this.handleCategory} src="/images/misc.png" alt="misc category icon"></img><p>Misc.</p></li>
            <li className="item"><img name="Relationships" onClick={this.handleCategory} src="/images/misc.png" alt="misc category icon"></img><p>Relationships</p></li>
            <li className="item"><img name="Studies" onClick={this.handleCategory} src="/images/misc.png" alt="misc category icon"></img><p>Studies</p></li>
          </ul>
        </div>
        <h3>{category} confessions</h3>
        {usesCategory ? <p onClick={this.handleRecent}>View all</p> : <></>}
        {loading ? 'loading...' : this.renderConfessions()}
        <NavBar />
      </div >
    );
  }
}

export default Home;
