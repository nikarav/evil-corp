import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';

class SignUpProvider extends React.Component {
  render() {
    return (
      <Form model="providerForm.user" onSubmit={v => console.log(v)}>
        <div className="field">
          <label>Username</label>
          <Control.text
            model=".username"
            placeholder="username"
            required
            validators={{ maxLength: (val) => val.length <= 15 }}
            validateOn="blur"
          />
          <Errors
            className="errors"
            model=".username"
            show="touched"
            messages={{
              valueMissing: 'Username is required',
              maxLength: 'Must be 15 characters or less'
            }}
          />
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
          <label>Age</label>
          <Control
            type="number"
            model=".age"
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

        <button type="submit">
          Submit
        </button>
        <Control.reset model="user" className="secondary">
          Clear Values
        </Control.reset>
      </Form>
    );
  }
}

export default SignUpProvider;
