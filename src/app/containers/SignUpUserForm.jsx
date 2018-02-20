import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { signUpUser } from '../actions/users';


// TODO:
// Add error checking in forms and control restrictions

class SignUpUserForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    this.props.signUpUser(values);
    console.log(values);
  }

  render() {
    return (
      <div>
        <h1> User (Parent) sign up! </h1>
        <Form
          model="userForm.user"
          onSubmit={(val) => this.handleSubmit(val)}
        >
          <div className="field">
              <label> Όνομα </label>
              <Control.text model=".name" />
              <label> Επώνυμο </label>
              <Control.text model=".surname" />
          </div>

          <div className="field">
            <label>Email</label>
            <Control
              type="email"
              model=".email"
              placeholder="email@example.com"
              required
              validateOn="blur"
            />
            <Errors
              className="errors"
              model=".email"
              show="touched"
              messages={{
                valueMissing: 'Email is required',
                typeMismatch: 'Invalid email address',
              }}
            />
          </div>

          <div className="field">
            <label> address </label>
            <Control.text model=".address" />

              <label> telephone </label>
              <Control.text model=".telephone" />

          </div>

          <div className="field">
            <label> birthday </label>
            <Control
              type="number"
              model=".birthday"
              placeholder="99"
              required
              min={18}
              validateOn="blur"
            />
            <Errors
              className="errors"
              model=".age"
              show="touched"
              messages={{
                valueMissing: 'Age is required',
                typeMismatch: 'Must be a number',
                rangeUnderflow: 'Sorry, you must be at least 18 years old',
              }}
            />
          </div>

          <div className="field">
              <label>Username</label>
              <Control.text
                model=".username"
                placeholder="username"
                required
                validators={{ maxLength: (val) => val.length <= 10 }}
                validateOn="blur"
              />
              <Errors
                className="errors"
                model=".username"
                show="touched"
                messages={{
                  valueMissing: 'Username is required',
                  maxLength: 'Must be 10 characters or less'
                }}
              />

              <label> Password </label>
              <Control.text model=".password" />

          </div>

          <button>Submit!</button>
        </Form>
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

export default connect(mapStateToProps, {signUpUser})(SignUpUserForm);
