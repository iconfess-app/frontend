/* eslint-disable no-console */
import React, { Component } from 'react';
import Select from 'react-select';
import confessionService from '../services/confessionService';

class Confessional extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      category: null,
      isDestroyed: true,
      submitted: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect = category => {
    const categoryValue = category.map(category => category.value);
    console.log(categoryValue);
    this.setState({ category: [...categoryValue] });
  };

  handleInput(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
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
    const { description, isDestroyed } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>Confessional</h1>
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
          <p>Máx.3000 characters</p>
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
            ]}
          />
          <label>
            <input name="isDestroyed" type="checkbox" checked={isDestroyed} onChange={this.handleInput} />
            This secret will be destroyed after 24h.
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Confessional;
