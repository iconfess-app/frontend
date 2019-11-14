import React from 'react';
import Navbar from './components/NavBar';
import './Information.css';

function Information() {

  return <div className="container">
    <div className="content">
      <h3>Privacy policy</h3>
      <h5>Rules for the use of iConfess</h5>
      <p>At iConfess we want to keep things friendly. We want it to be a safe 
        environment where everybody finds a source of relief and understanding. 
        That’s why it is really important for you to follow these rules:</p>
        <ul className="cross-list">
          <li>Confessions are about YOU: things that happened to you, emotions or feelings you have</li>
          <li>You can’t use someone’s real name, address or any other data that could make them recognizable</li>
          <li>iConfess is not a place to make death wishes</li>
          <li>Remember that other people are reading: avoid sensitive content</li>
        </ul>
      <p>We also want to mention that we are not an alternative to therapy; were you struggling with any issue, 
        we would always recommend you seek professional help.</p>
      <p>Needless to say, iConfess will never make any action to know your identity, let alone share it with 
        any particular or third-party. By signing up, you do allow iConfess to use your email for important 
        information about your account or promotional reasons.</p>
    </div>
    <Navbar />
  </div>
}

export default Information;