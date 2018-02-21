import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import Header from '../containers/HeaderContainer.js';
import PostDetailsContainer from '../containers/ActivitiesListContainer';


const ActivitiesShow = () => {
    return (
      <Route
          render={() => {
            return (
              <div className="container">
                <PostDetailsContainer id={this.props.params.id} />
              </div>
            );
          }
        }
        />
    );
};


export default ActivitiesShow;
