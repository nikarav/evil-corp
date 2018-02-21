import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import SignUpUserForm from '../containers/SignUpUserForm';
import SignUpProviderForm from '../containers/SignUpProviderForm';
import { Block } from 'jsxstyle';


const Users = () => {
    return (
      <Route render={() => {
        return (
          <Block
            marginTop={60}>
            <Navigation />
            <SignUpUserForm />
            <SignUpProviderForm />
          </Block>
          );  }
    }
    />
    );
};

export default Users;
