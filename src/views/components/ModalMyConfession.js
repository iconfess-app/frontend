import React from 'react';
import Popup from 'reactjs-popup';

const ModalMyConfession = myconfession => {
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
  return (
    <Popup trigger={<button className="button"> {myconfession.description} </button>} modal>
      {close => (
        <div className="card modal" style={cardStyle}>
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="card-header">
            <span className="avatar">{myconfession.date}</span>
            <p className="time" style={inline}>
              {myconfession.time}
            </p>
          </div>
          <div className="description">
            <p>{myconfession.description}</p>
          </div>
          <div className="card-footer">
            <p style={inline}>{myconfession.category}</p>
            <p style={inline}>{myconfession.likesCounter} likes</p>
            <p style={inline}>
              <a href="/">Delete</a>
            </p>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalMyConfession;
