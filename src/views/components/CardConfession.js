import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import confessionService from '../../services/confessionService';

class CardConfession extends Component {
  state = {
    likes: "",
    liked: "",
    posted: "",
  }

  componentDidMount = () => {
    this.setState({
      likes: [...this.props.likes],
    });
    this.checkIfUserDidLike();
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
    this.calculateHours();
  }

  calculateHours = () => {
    const postedMinutesAgo = parseInt(((new Date()) - new Date(`${this.props.created}`)) / 60000);
    if (postedMinutesAgo > 1440) {
      const days = parseInt(postedMinutesAgo / 1140);
      return this.setState({ posted: `${days}d ago` })
    }
    if (postedMinutesAgo < 1440 && postedMinutesAgo > 60) {
      const hours = parseInt(postedMinutesAgo / 60);
      return this.setState({ posted: `${hours}h ago`, })
      // eslint-disable-next-line no-else-return
    } else {
      return this.setState({ posted: `${postedMinutesAgo}min ago`, })
    }
  }

  handleLike = () => {
    confessionService.likeConfession(this.props.id)
      .then((confession) => {
        this.setState({
          likes: [...confession.likes],
          liked: true,
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUnlike = () => {
    confessionService.unlikeConfession(this.props.id)
      .then((confession) => {
        this.setState({
          likes: [...confession.likes],
          liked: false,
        })
      })
      .catch(error => {
        console.log(error);
      });
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
    const { avatar, username, description, categories, chat } = this.props;
    const { likes, posted } = this.state;

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
            {posted}
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