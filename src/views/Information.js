import React from 'react';
import Navbar from './components/NavBar';

function Information() {

  return <div className="container">
    <div className="content">
      <h2>Privacy policy</h2>
      <h5>Rules for the use of iConfess</h5>
      <p>At iConfess our most important rule is to keep things friendly. We want it to be a safe
        environment where everybody finds a source of relief and understanding.
        That’s why we urge all of our dear confessors to follow these rules:</p>
      <ul className="cross_list">
        <li className="cross_list_item">Confessions are about YOU: things that happened to you, emotions or feelings you have. Don't use it to gossip about others.</li>
        <li className="cross_list_item">You can’t use someone’s real name, address or any other data that could make them recognizable.</li>
        <li className="cross_list_item">iConfess is not a place to make death wishes.</li>
        <li className="cross_list_item">Remember that other people are reading: avoid sensitive content.</li>
      </ul>
      <p>We also want to mention that we are not an alternative to therapy; were you struggling with any issue,
        we would always recommend you seek professional help.</p>
      <h5>Use of user's data</h5>
      <p>Needless to say, iConfess will never make any action to know your identity, let alone share it with
        any particular or third-party. By signing up, you do allow iConfess to use your email for important
        information about your account or promotional reasons.</p>
      <p>iConfess does not hold any responsability concerning the content of its users posts, confessions and/or chat conversations.</p>
    </div>
    <Navbar />
  </div>
}

export default Information;