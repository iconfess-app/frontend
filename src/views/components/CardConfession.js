import React, { Component } from 'react';
import confessionService from '../../services/confessionService';

class CardConfession extends Component {
  state = {
    liked: false,
    likes: this.props.likesCounter,
  }

  handleChange = () => {
    this.setState({
      liked: !this.state.liked,
    });
    this.handleIncrement();
  }

  handleIncrement = () => {
    const { liked } = this.state;
    if (liked === false) {
      this.setState({
        likes: this.props.likesCounter + 1,
      })
    }
    if (liked === true) {
      this.setState({
        likes: this.props.likesCounter,
      })
    }
    this.handleUpdate();
    // const likesCounter = this.state.likes;
    // console.log(id, likesCounter);
    // confessionService.likeConfession({ id, likesCounter });
  }

  handleUpdate = () => {
    const { id } = this.props;
    const likesCounter = this.state.likes;
    console.log(id, likesCounter);
    confessionService.likeConfession({ id, likesCounter });
  }

  render() {
    console.log(this.state);
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
    const { avatar, username, description, category, time, chat } = this.props;
    const { likes } = this.state;
    return (
      <div className="card" style={cardStyle} >
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

          {/* Adds like input */}
          <input type="checkbox"
            onChange={this.handleChange}
            defaultChecked={this.state.liked} />

          <p style={inline}>{likes} likes</p>

          <p style={inline}>{chat ? 'Chat with me' : 'No chat icon'}</p>
        </div>
      </div>
    )
  }
}

export default CardConfession;

// import React from 'react';

// const CardConfession = props => {
//   const cardStyle = {
//     border: '1px solid black',
//     marginBottom: '16px',
//     borderRadius: '25px',
//     padding: '16px',
//   };
//   const inline = {
//     display: 'inline-block',
//     marginRight: '16px',
//   };
//   const { avatar, username, description, category, time, likesCounter, chat } = props;
//   return (
//     <div className="card" style={cardStyle}>
//       <div className="card-header">
//         <span className="avatar">
//           <img src={avatar} width="56" alt={username} />
//         </span>
//         <p className="username" style={inline}>
//           @{username}
//         </p>
//         <p className="time" style={inline}>
//           {time}
//         </p>
//       </div>
//       <div className="description">
//         <p>{description}</p>
//       </div>
//       <div className="card-footer">
//         <p style={inline}>{category}</p>
//         <p style={inline}>{likesCounter} likes</p>
//         <p style={inline}>{chat ? 'Chat with me' : 'No chat icon'}</p>
//       </div>
//     </div>
//   );
// };

// export default CardConfession;
