import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { manualLogin, logOut } from '../actions/users';
import { Button, FormControl, Block } from 'react-bootstrap';

// TODO:
// Add error checking in forms and control restrictions


class LogInForm extends React.Component {
  handleSubmit(values) {
    // Do anything you want with the form value
    this.props.manualLogin(values);
    console.log(values);
  }



  render() {

    if (!this.props.user.authenticated_user && !this.props.user.authenticated_provider && !this.props.user.authenticated_administrator) {
      return (


          <Form
            model="Forms.logIn"
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

            <Button type="submit" bsStyle="success" >Login</Button>
          </Form>


      );
    }
    else if (this.props.user.authenticated_user || this.props.user.authenticated_provider || this.props.user.authenticated_administrator)
      return(
          <Button
            bsStyle="danger"
          onClick={() => this.props.logOut()} >
            Log out
          </Button>
      );
    else
      return(<div> Un wanted state of loggin! logged in as BOTH parent and provider </div>);
  }
}

export default LogInForm;
