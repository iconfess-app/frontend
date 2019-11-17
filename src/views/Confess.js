/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sensitiveContent from '../data/sensitiveContent.json';
import confessionService from '../services/confessionService';
import NavBar from './components/NavBar';
import { withFlash } from '../Context/NotificationContext';

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
      error: false,
      isEncoded: false,
    };
  }

  handleCategory = event => {
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
  };

  handleInput = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { description, isEncoded } = this.state;
    const keyword = description.toLowerCase();
    const sensitiveValidation = sensitiveContent.some(substring => keyword.includes(substring));
    this.setState({
      [name]: value,
      isSensitive: sensitiveValidation,
      isTooLong: description.length > 140 ? true : false,
      isTooShort: description.length < 10 ? true : false,
    });
  };

  handleEncoded = () => {
    const { isEncoded } = this.state;
    this.setState({
      isEncoded: !isEncoded,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { category } = this.state;
    try {
      if (category.length === 0) {
        this.setState({
          isUncategorized: true,
          error: true,
        });
        this.props.handleFlash(`Missing confession's category`, 'error');
      } else {
        confessionService.postNewConfession(this.state);
        this.setState({
          submitted: true,
        });
        this.props.handleFlash('Yay! Confession submitted!', 'success');
      }
    } catch (error) {
      this.props.handleFlash('Oops! Something went wrong', 'error');
    }
  };

  render() {
    const { description, isDestroyed, isSensitive, isUncategorized, isTooLong, isTooShort, isEncoded } = this.state;
    const validConfession = !isSensitive && !isTooLong && !isTooShort && !isUncategorized;
    const goBack = () => this.props.history.goBack();
    console.log(this.state);
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
      <div className="container">
        <div className="content">
          <div className="top-header">
            <span onClick={goBack}>
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2624 19.1765L4.36879 10.812L13.2624 2.29805L11.078 0.206909L0 10.812L11.078 21.2677L13.2624 19.1765Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
            <h3>Confessional</h3>
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.handleEncoded}
            >
              <path
                d="M19.3 0L7.8 11.5C7 11 6 10.7 5 10.7C2.2 10.7 0 12.9 0 15.7C0 18.5 2.2 20.7 5 20.7C7.8 20.7 10 18.5 10 15.7C10 14.7 9.7 13.7 9.2 12.9L15 7.1L17.3 9.4L18.7 8L16.4 5.7L18 4.1L20.3 6.4L21.7 5L19.4 2.7L20.7 1.4L19.3 0ZM5 18.7C3.3 18.7 2 17.4 2 15.7C2 14 3.3 12.7 5 12.7C6.7 12.7 8 14 8 15.7C8 17.4 6.7 18.7 5 18.7Z"
                fill="white"
                fillOpacity="0.6"
              />
            </svg>
          </div>
          <form className="group-form" onSubmit={this.handleSubmit}>
            <p className="privacy-text">
              Suggested: <br />
              <Link to="/privacy-policy" className="red-link">
                User conditions about confessions content.
              </Link>
            </p>
            <h5>What do you wish to confess?</h5>
            <textarea
              type="text"
              name="description"
              onChange={this.handleInput}
              placeholder="I confess..."
              value={description}
              rows="10"
              cols="30"
              className={
                // eslint-disable-next-line no-nested-ternary
                isEncoded
                  ? 'group-form__textarea--encoded'
                  : isSensitive || isTooShort || isTooLong
                  ? 'error-input'
                  : 'group-form__textarea'
              }
            />
            <p className="group-form__helper-input">Max. 140 characters</p>
            {isSensitive && (
              <div className="error-message">
                <p>Keep it friendly, this is forbidden content!</p>
              </div>
            )}
            {isTooLong && (
              <div className="error-message">
                <p>This confession is too long!!</p>
              </div>
            )}
            {isTooShort && (
              <div className="error-message">
                <p>This confession is too short!!</p>
              </div>
            )}
            <div className="group-form__toggle-options top-spacer-large">
              <span className="group-form__toggle-text"> This secret will be shown only for 24h.</span>
              <label className="group-form__toggle">
                <input
                  type="checkbox"
                  value={isDestroyed}
                  name="isDestroyed"
                  checked={isDestroyed}
                  onChange={this.handleInput}
                />
                <span className="group-form__toggle__slider"></span>
              </label>
            </div>
            <h5>Choose a category</h5>
            {isUncategorized && <div className="error-message">Pick up at least one category</div>}
            <div className="scroll">
              <ul className="scroll__list">
                {categories.map(category => {
                  return (
                    <li key={category} className="scroll__item">
                      <img
                        src={`/images/${category}.png`}
                        alt="category icon"
                        name={category}
                        onClick={this.handleCategory}
                        className={this.state.category.includes(category) ? 'scroll__image--selected' : 'scroll__image'}
                      />
                      <p
                        className={this.state.category.includes(category) ? 'scroll__title--selected' : 'scroll__title'}
                      >
                        {category}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="btn btn-primary" disabled={!validConfession}>
              I want to confess it
            </button>
            <Link to="/">
              <button className="btn btn-outlined">I regretted</button>
            </Link>
          </form>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default withFlash(Confessional);
