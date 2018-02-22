import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import Header from '../containers/HeaderContainer.js';
import ActivitiesList from '../components/ActivitiesList';


const ActivitiesShow = () => {
    return (
      <Route
          render={() => {
            return (
              <div className="container">
                <ActivitiesList />
              </div>
            );
          }
        }
        />
    );
};


export default ActivitiesShow;
