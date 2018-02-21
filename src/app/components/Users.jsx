import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import SignUpUserForm from '../containers/SignUpUserForm';
import SignUpProviderForm from '../containers/SignUpProviderForm';
import LogInForm from '../containers/LogInForm';

const Users = () => {
    return (
      <Route render={() => {
        return (
          <div>
            <SignUpUserForm />
            <SignUpProviderForm />
            {/* <LogInForm /> */}
          </div>
          );  }
    }
    />
    );
}

export default Users;
