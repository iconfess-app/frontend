import React from 'react';
import ReactDOM from 'react-dom';

import AuthProvider from './Context/AuthContext';
import NotificationProvider from './Context/NotificationContext';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AuthProvider>
  <NotificationProvider>
    <App />
  </NotificationProvider>
</AuthProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
