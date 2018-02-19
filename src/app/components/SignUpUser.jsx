import React from 'react';
import { Form, Control } from 'react-redux-form';

class SignUpUser extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    console.log(values);
  }

  render() {
    return (
      <Form
        model="userForm.user"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <label>Your name?</label>
        <Control.text model=".firstName" />

        <button>Submit!</button>
      </Form>
    );
  }
}

export default SignUpUser;
