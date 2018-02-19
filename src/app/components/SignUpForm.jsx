import React from 'react';
import { Form, Control } from 'react-redux-form';

class SignUpForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    console.log(values);
  }

  render() {
    return (
      <Form
        model="user"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <label>Your name?</label>
        <Control.text model="user.name" />

        <label>
          <Control.checkbox model="user.remember" />
          Remember me
        </label>

        <button>Submit!</button>
      </Form>
    );
  }
}

export default SignUpForm;
