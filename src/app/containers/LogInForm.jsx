import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { manualLogin, logOut } from '../actions/users';
import { Button } from 'react-bootstrap';

// TODO:
// Add error checking in forms and control restrictions

class LogInForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    this.props.manualLogin(values);
    console.log(values);
  }

  render() {
    return (
      <div>
        <h1> Log in Form </h1>
        <Form
          model="logInForm.user"
          onSubmit={(val) => this.handleSubmit(val)}
        >
          <div className="field">
              <label>Username</label>
              <Control.text
                model=".username"
                placeholder="username"
                required
                validateOn="blur"
              />

              <label> Password </label>
              <Control.text model=".password" />
          </div>

          <button type="submit">Log in!</button>
        </Form>
        <Button onClick={() => this.props.logOut()} >
          Log out
        </Button>
      </div>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {manualLogin, logOut})(LogInForm);
