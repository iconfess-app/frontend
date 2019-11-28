import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom';

class CardMyConfession extends Component {
  redirect = () => {
    return <Redirect to="/myconfessions" />;
  };

  render() {
    const { date, description, categories, likes, onDelete, encoded } = this.props;

    return (
      <div className="card">
        <div className="card__header">
          <svg
            width="18"
            height="17"
            viewBox="0 0 13 12"
            fill="none"
            className="card__icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.42857 6.85716H2.28572V8.00002H3.42857V6.85716Z" fill="white" />
            <path d="M5.14286 6.85716H4V8.00002H5.14286V6.85716Z" fill="white" />
            <path d="M6.85714 6.85716H5.71429V8.00002H6.85714V6.85716Z" fill="white" />
            <path d="M8.57143 6.85716H7.42857V8.00002H8.57143V6.85716Z" fill="white" />
            <path d="M5.14286 5.14284H4V6.28569H5.14286V5.14284Z" fill="white" />
            <path d="M6.85714 5.14284H5.71429V6.28569H6.85714V5.14284Z" fill="white" />
            <path d="M8.57143 5.14284H7.42857V6.28569H8.57143V5.14284Z" fill="white" />
            <path d="M3.42857 8.57144H2.28572V9.7143H3.42857V8.57144Z" fill="white" />
            <path d="M5.14286 8.57144H4V9.7143H5.14286V8.57144Z" fill="white" />
            <path d="M6.85714 8.57144H5.71429V9.7143H6.85714V8.57144Z" fill="white" />
            <path d="M8.57143 8.57144H7.42857V9.7143H8.57143V8.57144Z" fill="white" />
            <path d="M10.2857 6.85716H9.14286V8.00002H10.2857V6.85716Z" fill="white" />
            <path d="M10.2857 5.14284H9.14286V6.28569H10.2857V5.14284Z" fill="white" />
            <path
              d="M12.5714 1.14286H10.8571V0H9.71429V2.28571H9.14286V1.14286H3.42857V0H2.28571V2.28571H1.71429V1.14286H0V12H12.5714V1.14286ZM11.4286 10.8571H1.14286V4H11.4286V10.8571Z"
              fill="white"
            />
          </svg>
          <span className={encoded ? `card--encoded card__date` : 'card__date'}>{date}</span>
        </div>
        <div className="card__description">
          <p>
            <span className={encoded ? 'card--encoded' : ''}>{description}</span>
          </p>
        </div>
        <ul className="card__categories">
          {categories.map((category, index) => (
            <li key={index} className="card__categories__item">
              <span className={encoded ? 'card--encoded' : ''}>{category}</span>
            </li>
          ))}
        </ul>
        <div className="card__footer">
          <div className="card__likes">
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.9153 2.37959L11.9424 2.35398L11.9676 2.32641C13.5822 0.557863 16.1385 0.557863 17.7531 2.32641L17.7622 2.33637L17.7716 2.34609C19.4095 4.04572 19.4095 6.79486 17.7716 8.49449L16.5425 9.76986L9.99452 16.5646L3.35972 9.78408L2.26055 8.52944L2.24491 8.51159L2.22844 8.49449C0.59052 6.79486 0.59052 4.04572 2.22844 2.34609C3.84632 0.667247 6.43301 0.667247 8.05089 2.34609L8.06742 2.36324L8.08475 2.37959L9.3138 3.53901L10 4.18633L10.6862 3.53901L11.9153 2.37959Z"
                stroke="#FF7F57"
                strokeWidth="2"
                className={likes.length === 0 ? 'card__likes' : 'card__likes--active'}
              />
            </svg>
            {likes.length === 1 ? (
              <span className="card__likes__length">{likes.length} like</span>
            ) : (
              <span className="card__likes__length">{likes.length} likes</span>
            )}
          </div>
          <Popup
            overlayClassName="overlay"
            trigger={
              <button className="card__todelete">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 18.7444C2 20.3377 3.3 21.5561 5 21.5561H15C16.7 21.5561 18 20.3377 18 18.7444V4.6861H20V2.81166H15V1.87444C15 0.843498 14.1 0 13 0H7C5.9 0 5 0.843498 5 1.87444V2.81166H0V4.6861H2V18.7444ZM7 1.87444H13V2.81166H7V1.87444ZM16 4.6861V18.7444C16 19.3067 15.6 19.6816 15 19.6816H5C4.4 19.6816 4 19.3067 4 18.7444V4.6861H16Z"
                    fill="white"
                  />
                  <path d="M11 6.56054H9V17.8072H11V6.56054Z" fill="white" />
                  <path d="M8 6.56054H6V17.8072H8V6.56054Z" fill="white" />
                  <path d="M14 6.56054H12V17.8072H14V6.56054Z" fill="white" />
                </svg>
              </button>
            }
            position="left center"
          >
            {close => (
              <>
                <div className="popup-content__close" onClick={close}>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.01342 15.6167L8.6623 9.38334L15.3112 15.6167L16.6801 14.3333L10.0312 8.1L16.6801 1.86667L15.3112 0.583336L8.6623 6.81667L2.01342 0.583336L0.644531 1.86667L7.29341 8.1L0.644531 14.3333L2.01342 15.6167Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="popup-content__description">
                  <h4>Are you sure you want to delete?</h4>
                  <button onClick={onDelete} className="btn btn-primary">
                    Yes
                  </button>
                  <button onClick={close} className="btn btn-outlined">
                    No
                  </button>
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    );
  }
}

export default CardMyConfession;
