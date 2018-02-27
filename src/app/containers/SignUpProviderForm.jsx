import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { signUpProvider } from '../actions/users';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';


// TODO:
// Add error checking in forms and control restrictions

class SignUpProviderForm extends React.Component {
  handleSubmit(values, event) {
    // Do anything you want with the form value
    const formData = new FormData(event.target);
    this.props.signUpProvider(formData);
    event.preventDefault();
    console.log(values);
  }

  render() {
    return (
      <div>
        <h1>
Εγγραφή ως πάροχος        </h1>

      <Form
        model="Forms.providerSignUp"
        encType="multipart/form-data"
        onSubmit={(val, event) => this.handleSubmit(val, event)}
        >
        <div className="field">
          <label>Όνομα Εταιρείας</label>
          <Control.text
            component={FormControl}
            model=".brand_name"
          />
          <label>Email</label>
          <Control.text
            model=".email"
            component={FormControl}
          />
        </div>

        <div className="field">
          <label>Τηλέφωνο</label>
          <Control.text
            component={FormControl}
            model=".telephone"
          />
          <label>Διέυθυνση</label>
          <Control.text
            component={FormControl}
            model=".address"
          />
        </div>

        <div className="field">
          <label>Tax registration</label>
          <Control.text
            component={FormControl}
            model=".tax_registration"
            validators={{ maxLength: (val) => val.length > 10 }}
          />
          <Errors
            className="errors"
            model=".tax_registration"
            show="touched"
            messages={{
              valueMissing: 'Username is required',
              maxLength: 'Must be 12 characters or less'
            }}
          />

          <label>Τραπεζικό iban</label>
          <Control.text
            component={FormControl}
            model=".bank_iban"
          />
          <Errors
            className="errors"
            model=".bank_iban"
            show="touched"
            validators={{ maxLength: (val) => val.length > 10 }}
            messages={{
              valueMissing: 'Username is required',
              maxLength: 'Must be 12 characters or less'
            }}
          />
        </div>

        <div className="field">
          <label>Νομικό Έγγραφο Επιχείρισης</label>
          <Control.file model=".document" />
        </div>

        <div className="field">
          <label>Όνομα Χρήστη</label>
          <Control.text
            component={FormControl}
            model=".username"
            placeholder="username"
            required
            validators={{ maxLength: (val) => val.length <= 12 }}
            validateOn="blur"
          />
          <Errors
            className="errors"
            model=".username"
            show="touched"
            messages={{
              valueMissing: 'Username is required',
              maxLength: 'Must be 12 characters or less'
            }}
          />
          <label>Κωδικός Πρόσβασης</label>
          <Control.text
            component={FormControl}
            model=".password"
            required
          />
        </div>

        <Button type="submit"

        bsStyle="success">
          Εγγραφή
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
