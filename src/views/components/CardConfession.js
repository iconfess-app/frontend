import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import confessionService from '../../services/confessionService';
import '../../sass/main.scss';

class CardConfession extends Component {
  state = {
    likes: '',
    liked: '',
    posted: '',
  };

  componentDidMount = () => {
    this.setState({
      likes: [...this.props.likes],
    });
    this.checkIfUserDidLike();
  };

  checkIfUserDidLike = () => {
    const { likes } = this.props;
    const userId = this.props.user._id;
    if (likes.includes(userId) === true) {
      this.setState({
        liked: true,
      });
    } else if (likes.includes(userId) === false) {
      this.setState({
        liked: false,
      });
    }
    this.calculateHours();
  };

  calculateHours = () => {
    const postedMinutesAgo = parseInt((new Date() - new Date(`${this.props.created}`)) / 60000);
    if (postedMinutesAgo > 1440) {
      const days = parseInt(postedMinutesAgo / 1140);
      return this.setState({ posted: `${days}d` });
    }
    if (postedMinutesAgo < 1440 && postedMinutesAgo > 60) {
      const hours = parseInt(postedMinutesAgo / 60);
      return this.setState({ posted: `${hours}h` });
      // eslint-disable-next-line no-else-return
    } else {
      return this.setState({ posted: `${postedMinutesAgo}min` });
    }
  };

  handleLike = () => {
    const { id } = this.props;
    const { liked } = this.state;
    const call = liked ? confessionService.unlikeConfession(id) : confessionService.likeConfession(id);

    call
      .then(confession => {
        this.setState({
          likes: [...confession.likes],
          liked: !liked,
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { avatar, username, description, categories, chat } = this.props;
    const { likes, posted, liked } = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="avatar">
            <img src={avatar} width="56" alt={username} />
          </div>
          <div className="info">
            <p className="username">@{username}</p>
            <p className="time">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 14.5C11.3818 14.5 14.5 11.3818 14.5 7.5C14.5 3.61818 11.3818 0.5 7.5 0.5C3.61818 0.5 0.5 3.61818 0.5 7.5C0.5 11.3818 3.61818 14.5 7.5 14.5ZM7.5 1.77273C10.6818 1.77273 13.2273 4.31818 13.2273 7.5C13.2273 10.6818 10.6818 13.2273 7.5 13.2273C4.31818 13.2273 1.77273 10.6818 1.77273 7.5C1.77273 4.31818 4.31818 1.77273 7.5 1.77273Z"
                    fill="white"
                  />
                  <path
                    d="M10.4909 9.6L8.13636 7.24545V3.04545H6.86364V7.75455L9.6 10.4909L10.4909 9.6Z"
                    fill="white"
                  />
                </svg>
              </span>
              {posted}
            </p>
          </div>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="categories">
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <div className="likes">
            <div className="icon-like-wrapper">
              <svg
                onClick={this.handleLike}
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9153 2.37959L11.9424 2.35398L11.9676 2.32641C13.5822 0.557863 16.1385 0.557863 17.7531 2.32641L17.7622 2.33637L17.7716 2.34609C19.4095 4.04572 19.4095 6.79486 17.7716 8.49449L16.5425 9.76986L9.99452 16.5646L3.35972 9.78408L2.26055 8.52944L2.24491 8.51159L2.22844 8.49449C0.59052 6.79486 0.59052 4.04572 2.22844 2.34609C3.84632 0.667247 6.43301 0.667247 8.05089 2.34609L8.06742 2.36324L8.08475 2.37959L9.3138 3.53901L10 4.18633L10.6862 3.53901L11.9153 2.37959Z"
                  stroke="#FF7F57"
                  strokeWidth="2"
                  className={liked ? 'icon-like--active' : 'icon-like'}
                />
              </svg>
            </div>

            {likes.length === 1 ? <span>{likes.length} like</span> : <span>{likes.length} likes</span>}
          </div>
          <div className="right">
            {chat ? (
              <button className="chat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.3554 2H4.47934C3.07438 2 2 3.07438 2 4.47934V15.2231C2 16.6281 3.07438 17.7025 4.47934 17.7025H5.30579V22L10.1818 17.7025H19.3554C20.7603 17.7025 21.8347 16.6281 21.8347 15.2231V4.47934C21.8347 3.07438 20.7603 2 19.3554 2ZM20.1818 15.2231C20.1818 15.719 19.8512 16.0496 19.3554 16.0496H9.52066L6.95868 18.3636V16.0496H4.47934C3.98347 16.0496 3.65289 15.719 3.65289 15.2231V4.47934C3.65289 3.98347 3.98347 3.65289 4.47934 3.65289H19.3554C19.8512 3.65289 20.1818 3.98347 20.1818 4.47934V15.2231Z" />
                  <path d="M17.7025 6.95868H6.13223V8.61157H17.7025V6.95868Z" />
                  <path d="M17.7025 10.2645H6.13223V11.9174H17.7025V10.2645Z" />
                </svg>
              </button>
            ) : (
              <button className="chat-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.3554 2H4.47934C3.07438 2 2 3.07438 2 4.47934V15.2231C2 16.6281 3.07438 17.7025 4.47934 17.7025H5.30579V22L10.1818 17.7025H19.3554C20.7603 17.7025 21.8347 16.6281 21.8347 15.2231V4.47934C21.8347 3.07438 20.7603 2 19.3554 2ZM20.1818 15.2231C20.1818 15.719 19.8512 16.0496 19.3554 16.0496H9.52066L6.95868 18.3636V16.0496H4.47934C3.98347 16.0496 3.65289 15.719 3.65289 15.2231V4.47934C3.65289 3.98347 3.98347 3.65289 4.47934 3.65289H19.3554C19.8512 3.65289 20.1818 3.98347 20.1818 4.47934V15.2231Z" />
                  <path d="M17.7025 6.95868H6.13223V8.61157H17.7025V6.95868Z" />
                  <path d="M17.7025 10.2645H6.13223V11.9174H17.7025V10.2645Z" />
                </svg>
              </button>
            )}
            <button className="report">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 1C5.9 1 1 5.9 1 12C1 18.1 5.9 23 12 23C18.1 23 23 18.1 23 12C23 5.9 18.1 1 12 1ZM12 21C7 21 3 17 3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21Z"
                  fill="white"
                />
                <path d="M13 6.5H11V14.5H13V6.5Z" fill="white" />
                <path d="M13 15.5H11V17.5H13V15.5Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(CardConfession);
