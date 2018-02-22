import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';


const ParentProfile = () => {
    return (
      <Route render={() => {
        return (
          <Block
            marginTop={60}>
            <Navigation />
            <h1> Το προφίλ μου</h1>
          </Block>
          );  }
    }
    />
    );
}

export default ParentProfile;
