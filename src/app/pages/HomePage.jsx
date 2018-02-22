import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';

const HomePage = () => {
  return (
    <Route
        render={() => {
      return (
        <Block
          marginTop={60}>
          <Navigation />
          <h1>Starter Page</h1>
        </Block>
      );
    }}
    />
  );
};

export default HomePage;
