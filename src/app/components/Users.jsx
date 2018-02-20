import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import SignUpUser from './SignUpUser';
import SignUpProvider from './SignUpProvider';

const Users = () => {
    return (
      <Route render={() => {
        return (
          <div>
            <SignUpUser />
            {/* <SignUpProvider/> */}
          </div>
          );  }
    }
    />
    );
}

export default Users;
