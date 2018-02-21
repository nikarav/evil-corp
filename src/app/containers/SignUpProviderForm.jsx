import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { signUpProvider } from '../actions/users';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';


// TODO:
// Add error checking in forms and control restrictions

class SignUpProviderForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    this.props.signUpProvider(values);
    console.log(values);
  }

  render() {
    return (
      <div>
        <h1>
          Provider sign up!
        </h1>

      <Form
        model="providerForm.user"
        onSubmit={(val) => this.handleSubmit(val)}
        >
        <div className="field">
          <label>Brand name</label>
          <Control.text
            model=".brand_name"
          />
          <label>email</label>
          <Control.text
            model=".email"
          />
        </div>

        <div className="field">
          <label>telephone</label>
          <Control.text
            model=".telephone"
          />
          <label>address</label>
          <Control.text
            model=".address"
          />
        </div>

        <div className="field">
          <label>Tax registration</label>
          <Control.text
            model=".tax_registration"
          />
          <label>Bank iban</label>
          <Control.text
            model=".bank_iban"
          />
        </div>

        <div className="field">
          <label>Username</label>
          <Control.text
            model=".username"
          />
          <label>Passwrod</label>
          <Control.text
            model=".password"
          />
        </div>

        <Button type="submit">
          Submit
        </Button>
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

export default connect(mapStateToProps, {signUpProvider})(SignUpProviderForm);
