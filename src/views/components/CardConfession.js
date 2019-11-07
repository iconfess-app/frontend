import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import confessionService from '../../services/confessionService';

class CardConfession extends Component {
  state = {
    likes: "",
    liked: "",
    numberOfLikes: "",
  }

  checkIfUserDidLike = () => {
    const { likes } = this.props;
    const userId = this.props.user._id;
    if (likes.includes(userId) === true) {
      this.setState({
        liked: true,
      })
    } else if (likes.includes(userId) === false) {
      this.setState({
        liked: false,
      });
    }
  }

  componentDidMount = () => {
    this.setState({
      likes: [...this.props.likes],
      numberOfLikes: this.props.likes.length,
    });
    this.checkIfUserDidLike();
    this.handleLike();
  }

  handleLike = () => {
    try {
      confessionService.likeConfession(this.props.id);
      // const updatedConfession = this.updateConfession();
      this.setState({
        // likes: updatedConfession.likes,
        liked: true,
      });
    } catch (error) {
      console.log(error);
    }
  }


  handleUnlike = () => {
    try {
      confessionService.unlikeConfession(this.props.id);
      // const updatedConfession = this.updateConfession();
      this.setState({
        // likes: updatedConfession.likes,
        liked: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
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
    const { avatar, username, description, categories, time, chat } = this.props;
    const { likes } = this.state;
    console.log(this.state);
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
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>

          {this.state.liked && <div onClick={this.handleUnlike}><img src="/images/icon-liked.png" alt="liked full heart" /></div>}
          {!this.state.liked && <div onClick={this.handleLike}><img src="/images/icon-unliked.png" alt="unliked empty heart" /></div>}

          <p style={inline}>{likes.length} likes</p>

          <p style={inline}>{chat ? 'Chat with me' : 'No chat icon'}</p>
        </div>
      </div>
    )
  }
}

export default withAuth(CardConfession);