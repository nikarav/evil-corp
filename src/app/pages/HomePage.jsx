import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation'

const HomePage = () => {
  return (
    <Route
        render={() => {
      return (
        <div>
          <Navigation />
          <h1>Starter Page</h1>
        </div>
      );
    }}
    />
  );
};

export default HomePage;
