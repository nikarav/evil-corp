import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { manualLogin, logOut } from '../actions/users';
import { Button, FormControl } from 'react-bootstrap';

// TODO:
// Add error checking in forms and control restrictions


class LogInForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    this.props.manualLogin(values);
    console.log(values);
  }

  render() {

    if (!this.props.user.authenticated_user && !this.props.user.authenticated_provider) {
      return (
          <Form
            model="logInForm.user"
            onSubmit={(val) => this.handleSubmit(val)}
          >
                <Control
                  model=".username"
                  placeholder="username"
                  required
                  validateOn="blur"
                  component={FormControl}
                />

                <Control
                  type="password"
                  model=".password"
                  placeholder="password"
                  component={FormControl}
                />

            <Button type="submit">Log in!</Button>
          </Form>
      );
    }
    else if (this.props.user.authenticated_user)
      return(
        <div>
          <h1> You are logged in as a Parent!</h1>
          <Button onClick={() => this.props.logOut()} >
            Log out
          </Button>
        </div>
      );

    else if (this.props.user.authenticated_provider)
      return(
        <div>
          <h1> You are logged in as a provider!</h1>
          <Button onClick={() => this.props.logOut()} >
            Log out
          </Button>
        </div>
       );
    else
      return(<div> <h1> Un wanted state of loggin! logged in as BOTH parent and provider </h1> </div>);
  }
}

export default LogInForm;
