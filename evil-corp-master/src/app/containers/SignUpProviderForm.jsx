import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { signUpProvider } from '../actions/users';
import { connect } from 'react-redux';
import { Button, FormControl, Block } from 'react-bootstrap';


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
Εγγραφή ως Πάροχος        </h1>


      <Form
        model="Forms.providerSignUp"
        onSubmit={(val) => this.handleSubmit(val)}
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
          />
          <label>Τραπεζικό iban</label>
          <Control.text
            component={FormControl}
            model=".bank_iban"
          />
        </div>

        <div className="field">
          <label>Όνομα Χρήστη</label>
          <Control.text
            component={FormControl}
            model=".username"
          />
          <label>Κωδικός Πρόσβασης</label>
          <Control.text
            component={FormControl}
            model=".password"
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
