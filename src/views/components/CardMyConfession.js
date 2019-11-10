import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom';

class CardMyConfession extends Component {
  redirect = () => {
    return <Redirect to="/myconfessions" />;
  };

  render() {
    const cardStyle = {
      border: '1px solid black',
      marginBottom: '16px',
      borderRadius: '25px',
      padding: '16px',
    };
    // const inline = {
    //   display: 'inline-block',
    //   marginRight: '16px',
    // };
    const { date, description, categories, likes, onDelete } = this.props;

    return (
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <span className="avatar">{date}</span>
          {/* <p className="time" style={inline}>
            {time}
          </p> */}
        </div>
        <div>
          <p>{description}</p>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <p>{likes.length} likes</p>
          <Popup trigger={<button>Delete</button>} position="right center">
            <div>
              Are you sure you want to delete?
              <button onClick={onDelete}>Yes</button>
              <button onClick={this.redirect}>No</button>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default CardMyConfession;