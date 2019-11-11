/* eslint-disable no-console */
import React, { Component } from 'react';
import Select from 'react-select';
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
      isUncategorized: true,
      isTooLong: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect = category => {
    const categoryValue = category.map(category => category.value);
    this.setState({ category: [...categoryValue] });

    // isCategorized validation
    console.log(category.length);
    if (category.length > 0) {
      console.log('Ok! categories on');
      this.setState({
        isUncategorized: false,
      });
    } else {
      console.log('No categories???');
      this.setState({
        isUncategorized: true,
      });
    }
  };

  handleInput(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    // isSensitivevalidation
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

  handleSubmit(event) {
    try {
      event.preventDefault();
      const newConfession = confessionService.postNewConfession(this.state);
      console.log(newConfession);
      this.setState({
        submitted: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { description, isDestroyed, isSensitive, isUncategorized, isTooLong, isTooShort } = this.state;
    const validConfession = !isSensitive && !isTooLong && !isTooShort && !isUncategorized;
    // const errorStyle = {
    //   color: 'red',
    // };
    return (
      <div>
        <div className="container">
          <h2>Confessional</h2>
          <p className="xsmall-text">Suggested: <a className="xsmall-text" href="#">User conditions about confessions content</a></p>
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
            <Select
              closeMenuOnSelect={false}
              isMulti
              placeholder={'Choose one or more categories'}
              autoFocus={true}
              onChange={this.handleSelect}
              onMouseOver={this.handleMouseDown}
              options={[
                { value: 'Sex', label: 'Sex' },
                { value: 'Family', label: 'Family' },
                { value: 'Work', label: 'Work' },
                { value: 'Addictions', label: 'Addictions' },
                { value: 'Friends', label: 'Friends' },
                { value: 'Fantasies', label: 'Fantasies' },
                { value: 'Self-esteem', label: 'Self-esteem' },
                { value: 'Health', label: 'Health' },
                { value: 'Studies', label: 'Studies' },
                { value: 'Miscellaneous', label: 'Miscellaneous' },
                { value: 'Relationships', label: 'Relationships' },
              ]}
            />
            {isUncategorized && <p style={{ color: 'red' }}>You must choose a category!!</p>}
            <label>
              <input name="isDestroyed" type="checkbox" checked={isDestroyed} onChange={this.handleInput} />
              This secret will be destroyed after 24h.
          </label>
            <button disabled={!validConfession}>Submit</button>
          </form>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Confessional;
