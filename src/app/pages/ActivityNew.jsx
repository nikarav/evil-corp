import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import ActivityCreate from '../components/ActivityCreate';


const ActivityNew = () => {
  return (
    <Route
        render={() => {
      return (
        <Block
          marginTop={60}>
          <Navigation />
        <ActivityCreate/>
        </Block>
      );
    }}
    />
  );
};


export default ActivityNew;
