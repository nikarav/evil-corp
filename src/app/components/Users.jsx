import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import SignUpUserForm from '../containers/SignUpUserForm';
import SignUpProviderForm from '../containers/SignUpProviderForm';

const Users = () => {
    return (
      <Route render={() => {
        return (
          <div>
            <SignUpUserForm />
            <SignUpProviderForm/>
          </div>
          );  }
    }
    />
    );
}

export default Users;
