import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';

function PrivateRoute({ component: Comp, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default withAuth(PrivateRoute);
