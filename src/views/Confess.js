/* eslint-disable no-console */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sensitiveContent from '../data/sensitiveContent.json';
import confessionService from '../services/confessionService';
import NavBar from './components/NavBar';

class Confessional extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      category: [],
      isDestroyed: true,
      submitted: false,
      isSensitive: false,
      isUncategorized: false,
      isTooLong: false,
    };
  }

  handleCategory = (event) => {
    const newCategory = event.target.name;
    const category = [...this.state.category];
    if (category.includes(newCategory)) {
      // Take out item
      const index = category.indexOf(event.target.name);
      if (index !== -1) {
        category.splice(index, 1);
        this.setState({
          category: [...category],
        });
      }
    } else {
      this.setState({
        category: [newCategory, ...category],
      });
    }
  }

  handleInput = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { description } = this.state;
    const keyword = description.toLowerCase();
    const sensitiveValidation = sensitiveContent.some(substring => keyword.includes(substring));
    this.setState({
      [name]: value,
      isSensitive: sensitiveValidation,
      isTooLong: description.length > 140 ? true : false,
      isTooShort: description.length < 10 ? true : false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { category } = this.state;
    try {
      if (category.length === 0) {
        this.setState({
          isUncategorized: true,
        });
      } else {
        const newConfession = confessionService.postNewConfession(this.state);
        console.log(newConfession);
        this.setState({
          submitted: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { description, isDestroyed, isSensitive, isUncategorized, isTooLong, isTooShort } = this.state;
    const validConfession = !isSensitive && !isTooLong && !isTooShort && !isUncategorized;
    const categories = ['Family', 'Addictions', 'Fantasies', 'Friends', 'Health', 'Misc.', 'Self-esteem', 'Sex', 'Work'];

    return (
      <div className="form">
        {/* <div className="container"> */}
        {/* <div className="content"> */}
        <h2>Confessional</h2>
        <p className="xsmall-text">Suggested: User conditions about confessions content</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>What do you wish to confess?</label>
          <textarea
            type="text"
            name="description"
            onChange={this.handleInput}
            placeholder="I confess..."
            value={description}
            rows="10"
            cols="30"
          />
          <p className="xsmall-text">Max. 140 characters</p>
          {isSensitive && <p style={{ color: 'red' }}>Keep it friendly, this is forbidden content!</p>}
          {isTooLong && <p style={{ color: 'red' }}>This confession is too long!!</p>}
          {isTooShort && <p style={{ color: 'red' }}>This confession is too short!!</p>}
          <label>Choose a category</label>

          <div className="scroll">
            <ul className="hscroll">
              {/* ==== STUDIES & RELATIONSHIPS IMAGES MISSING, just add them to the category array and to the pics folder ====== */}
              {categories.map(category => {
                return <li key={category} className="item" name={category} onClick={this.handleCategory}><img src={`/images/${category}.png`} alt="category icon" /><p>{category}</p></li>
              })}
            </ul>
          </div>
          {isUncategorized && <p style={{ color: 'red' }}>Pick up at least one category</p>}
          <p>{this.state.category}</p>
          <label>
            <input name="isDestroyed" type="checkbox" checked={isDestroyed} onChange={this.handleInput} />
            This secret will be destroyed after 24h.
          </label>
          <button className="btn btn-primary" disabled={!validConfession}>I want to confess it</button>
          <button className="btn btn-outlined"><Link to="/">I regretted</Link></button>
        </form>

        <NavBar />
      </div >
    );
  }
}

export default Confessional;
