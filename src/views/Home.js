/* eslint-disable no-console */
import React, { Component } from 'react';
import confessionService from '../services/confessionService';
import CardConfession from './components/CardConfession';

// CSS FILE DONE ONLY TO TEST, STYLES MUST BE ADDED PROPERLY
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allConfessions: [],
      recentConfessions: [],
      loading: true,
      category: "Recent",
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
        allConfessions,
        recentConfessions,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleCategory = (event) => {
    const category = event.target.name;
    const confessions = this.state.allConfessions;
    const filteredConfessions = confessions.filter(confession => confession.category.includes(category));
    this.setState({
      category,
      recentConfessions: [...filteredConfessions],
    })
  }

  handleRecent = () => {
    const { allConfessions } = this.state;
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
    });
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
    // imported CSS should go into SASS
    const { loading } = this.state;
    return (
      <div>
        <h1>Most popular categories</h1>
        <div className="scroll">
          <ul className="hscroll">
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
            <li className="item"><img onClick={this.handleRecent} src="/images/misc.png" alt="misc category icon"></img><p>Recent</p></li>
          </ul>
        </div>
        <h1>{this.state.category} confessions</h1>
        {loading ? 'loading...' : this.renderConfessions()}
      </div >
    );
  }
}

export default Home;
