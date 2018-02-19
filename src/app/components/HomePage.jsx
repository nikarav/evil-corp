import React from 'react';
import { Route } from 'react-router-dom';

const HomePage = () => {
  return (
    <Route render={({ staticContext }) => {
      return (
        <div>
          <h1>Starter Page</h1>
        </div>
      );
    }}
    />
  );
};

export default HomePage;
