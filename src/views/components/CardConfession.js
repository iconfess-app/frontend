import React from 'react';

const CardConfession = props => {
  const cardStyle = {
    border: '1px solid black',
    marginBottom: '16px',
    borderRadius: '25px',
    padding: '16px',
  };
  const inline = {
    display: 'inline-block',
    marginRight: '16px',
  };
  const { avatar, username, description, category, time, likesCounter, chat } = props;
  return (
    <div className="card" style={cardStyle}>
      <div className="card-header">
        <span className="avatar">
          <img src={avatar} width="56" alt={username} />
        </span>
        <p className="username" style={inline}>
          @{username}
        </p>
        <p className="time" style={inline}>
          {time}
        </p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <p style={inline}>{category}</p>
        <p style={inline}>{likesCounter} likes</p>
        <p style={inline}>{chat ? 'Chat with me' : 'No chat icon'}</p>
      </div>
    </div>
  );
};

export default CardConfession;
