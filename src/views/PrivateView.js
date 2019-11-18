import React from 'react';
import { withAuth } from '../Context/AuthContext';

const PrivateView = ({ user }) => {
  return (
    <div>
      PrivateView
      user: {user.username}
    </div>
  );
};

export default withAuth(PrivateView);