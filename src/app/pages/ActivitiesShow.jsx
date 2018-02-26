import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import ActivitiesList from '../components/ActivitiesList';
import PageHeader from 'react-bootstrap';
import NotificationComponent from '../components/NotificationComponent';

const ActivitiesShow = () => {
  return (
    <Route
        render={() => {
      return (

        <div>
        <Block
          marginTop={60}
          textDecoration= "underline  "
          backgroundColor = "#8FBC8F"
          textAlign= "center">

          <Navigation />
          <NotificationComponent />



          <h1>  Λίστα Δραστηριοτήτων</h1>

  </Block>
          <Block
            marginTop={10}
            backgroundColor = "#FAEBD7"
                      >

          <ActivitiesList />


        </Block>
      </div>

      );
    }}
    />
  );
};


export default ActivitiesShow;
