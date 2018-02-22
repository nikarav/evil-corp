import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import MapComponent from '../components/MapComponent';
import { Block } from 'jsxstyle';

const HomePage = () => {
  return (
    <Route
        render={() => {
      return (
        <Block
          marginTop={60}>
          <Navigation />
          <h1>Map tester page</h1>
          <MapComponent />
        </Block>
      );
    }}
    />
  );
};

export default HomePage;
