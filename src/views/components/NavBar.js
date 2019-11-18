import React from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <NavLink to="/" exact activeClassName="navbar__active" className="navbar__item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.4 14.1L2.7 12.8V22.4H20.7V12.8L22 14.1L23.4 12.7L11.7 1L6.7 6V4.4H4.7V8L0 12.7L1.4 14.1ZM18.7 10.8V20.4H4.7V10.8L11.7 3.8L18.7 10.8Z"
              fill="white"
            />
          </svg>
          <span className="navbar__label">Home</span>
        </NavLink>
        <NavLink to="/privacy-policy" exact activeClassName="navbar__active" className="navbar__item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H18V20H16V9H7V11H9V22ZM11 11H14V20H11V11Z" fill="white" />
            <path
              d="M12.5 8C14.4 8 16 6.4 16 4.5C16 2.6 14.4 1 12.5 1C10.6 1 9 2.6 9 4.5C9 6.4 10.6 8 12.5 8ZM12.5 3C13.3 3 14 3.7 14 4.5C14 5.3 13.3 6 12.5 6C11.7 6 11 5.3 11 4.5C11 3.7 11.7 3 12.5 3Z"
              fill="white"
            />
          </svg>
          <span className="navbar__label">Policy</span>
        </NavLink>
        <NavLink to="/confess" exact className="add-btn navbar__item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.9589 24H13.1507V13.1507H24V10.9589H13.1507V0H10.9589V10.9589H0V13.1507H10.9589V24Z"
              fill="white"
            />
          </svg>
        </NavLink>
        <NavLink to="/myconfessions" exact activeClassName="navbar__active" className="navbar__item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 22H23V8H24V4C24 2.3 22.7 1 21 1H3C1.3 1 0 2.3 0 4V8H1V22ZM21 20H3V8H21V20ZM2 4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6H2V4Z"
              fill="white"
            />
            <path d="M18 10H6V12H18V10Z" fill="white" />
          </svg>
          <span className="navbar__label">Archive</span>
        </NavLink>
        <NavLink to="/edit" exact activeClassName="navbar__active" className="navbar__item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 19.8C22 15.51 18.59 12.1 14.3 12.1H7.7C3.41 12.1 0 15.51 0 19.8V22H22V19.8ZM2.2 19.8C2.2 16.72 4.62 14.3 7.7 14.3H14.3C17.38 14.3 19.8 16.72 19.8 19.8H2.2Z"
              fill="white"
            />
            <path
              d="M16.5 5.5C16.5 2.42 14.08 0 11 0C7.91997 0 5.49997 2.42 5.49997 5.5C5.49997 8.58 7.91997 11 11 11C14.08 11 16.5 8.58 16.5 5.5ZM7.69997 5.5C7.69997 3.63 9.12997 2.2 11 2.2C12.87 2.2 14.3 3.63 14.3 5.5C14.3 7.37 12.87 8.8 11 8.8C9.12997 8.8 7.69997 7.37 7.69997 5.5Z"
              fill="white"
            />
          </svg>
          <span className="navbar__label">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default withAuth(NavBar);
// this.props.user.allowsConnection === true > chat / false === policy information
