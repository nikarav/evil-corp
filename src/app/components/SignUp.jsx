import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const SignUp = () => {
    return (
      <Route render={() => {
        return (
            <SignUpForm />
          );  }
    }
    />
    );
}

export default SignUp;
