import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import {LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { manualLogin, logOut, forgot } from '../actions/users';
import LogInForm from '../components/LogInForm';
import ActivityNew from '../pages/ActivityNew';
import '../Css/App.css';

class Navigation extends React.Component {

  handleForgot(){
    this.props.forgot({username: this.props.Forms.logIn.username});
  }

  render() {
    let sign_up_button, forgot_button = null;
    if (!this.props.user.authenticated_user && !this.props.user.authenticated_provider && !this.props.user.authenticated_administrator) {
      sign_up_button = (<Nav pullRight>
        <LinkContainer to="/register">
          <NavItem eventKey={1}> Εγγραφή </NavItem>
        </LinkContainer></Nav>);
       forgot_button = (<Button bsStyle="danger"


         onClick={() => this.handleForgot()}> Forgot Password  </Button>);
    } else {




      sign_up_button = null;
    }

    let sign_in_info = null;
                                                                        // provlima me this.props.parent.username
                                                                        // an anewseis to username apo th selida my_profile to Navbar edw skaei
    if (this.props.user.authenticated_user) {
        sign_in_info = (<Navbar.Text pullRight>
                      Συνδεδεμένος ως: <Navbar.Link href="#">{this.props.parent.username}</Navbar.Link>
        </Navbar.Text>);
    } else if (this.props.user.authenticated_provider) {
          sign_in_info = (<Navbar.Text pullRight>
                          Συνδεδεμένος ως: <Navbar.Link href="#">{this.props.provider.username}</Navbar.Link>
          </Navbar.Text>);

    } else if (this.props.user.authenticated_administrator) {
          sign_in_info = (<Navbar.Text pullRight>
                          Συνδεδεμένος ως: <Navbar.Link href="#">{this.props.admin.profile.username}</Navbar.Link>
          </Navbar.Text>);
        }
    else {
        sign_in_info = null;
    }
    let res_or_stats = null;
    if(this.props.user.authenticated_user){
      res_or_stats = (  <LinkContainer to="/Reservations">
          <NavItem eventKey={1}> Κρατήσεις </NavItem>
        </LinkContainer>);
    }
    else if(this.props.user.authenticated_provider){
      res_or_stats = (  <LinkContainer to="/provider/Statistics">
          <NavItem eventKey={1}> Στατιστικά </NavItem>
        </LinkContainer>);
    }
    else{
      res_or_stats = (  <LinkContainer to="/Reservations">
          <NavItem eventKey={1}> Κρατήσεις </NavItem>
        </LinkContainer>);
    }
    // else{
    //   res_or_stats = null;
    // }

    return (
      <div className="Navigation Component">
        <Navbar fixedTop fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                      Evil Corp
                    </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {res_or_stats}

              <LinkContainer to="/Offers">
                <NavItem eventKey={2} > Προσφορές </NavItem>
              </LinkContainer>

              <LinkContainer to="/MyProfile">
                <NavItem eventKey={3}> Το προφίλ μου </NavItem>
              </LinkContainer>

              <LinkContainer to="/Contact">
                <NavItem eventKey={4}> Επικοινωνία </NavItem>
              </LinkContainer>
            </Nav>

            {sign_up_button}

            <Navbar.Form pullRight>
              <FormGroup>
                <LogInForm
                user={this.props.user}
                manualLogin={this.props.manualLogin}
                logOut={this.props.logOut}
              />
              </FormGroup>
              {forgot_button}
            </Navbar.Form>

            {sign_in_info}

            {this.props.user.authenticated_provider &&
            <Nav pullRight>
              <LinkContainer to="/provider/new">
                <NavItem eventKey={1}> Νέα Δραστηριότητα </NavItem>
              </LinkContainer>
            </Nav>

        }

        {this.props.user.authenticated_administrator &&
        <Nav pullRight>
          <LinkContainer to="/admin">
            <NavItem eventKey={2}> Πάνελ ελέγχου </NavItem>
          </LinkContainer>
        </Nav>

    }
          </Navbar.Collapse>
        </Navbar>

      </div>
        );
      }
}


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    Forms: state.Forms,
    provider: state.provider,
    parent: state.parent,
    admin: state.administrator,
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {manualLogin, logOut, forgot})(Navigation);
