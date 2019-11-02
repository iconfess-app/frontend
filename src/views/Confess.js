/* eslint-disable no-console */
import React, { Component } from 'react';
import confessionService from '../services/confessionService';
import Select from 'react-select';

class Confessional extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      category: '',
      isDestroyed: true,
      submitted: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect = category => {
    this.setState({ category: category.value });
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
    const { description, category, isDestroyed } = this.state;
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
            name="category"
            value={category}
            onChange={this.handleSelect}
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
