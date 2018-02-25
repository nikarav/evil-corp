import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import ActivitiesList from '../components/ActivitiesList';


const ActivitiesShow = () => {
  return (
    <Route
        render={() => {
      return (
        <Block
          marginTop={60}>
          <Navigation />
          <h1> ActivitiesList </h1>
          <ActivitiesList />
        </Block>
      );
    }}
    />
  );
};


export default ActivitiesShow;
