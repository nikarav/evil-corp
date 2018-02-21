import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import {LinkContainer } from 'react-router-bootstrap';
import LogInForm from '../containers/LogInForm';
import '../Css/App.css';

const Navigation = () => {
    return (
      <Route
            render={() => {
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
                               <LinkContainer to="/Reservations">
                                  <NavItem eventKey={1}> Κρατήσεις </NavItem>
                              </LinkContainer>

                              <LinkContainer to="/Offers">
                                <NavItem eventKey={2} > Προσφορές </NavItem>
                              </LinkContainer>

                              <LinkContainer to="/MyWallet">
                                <NavItem eventKey={3}> Προτοφόλι </NavItem>
                              </LinkContainer>

                              <LinkContainer to="/Contact">
                                <NavItem eventKey={4}> Επικοινωνία </NavItem>
                              </LinkContainer>
                            </Nav>


                            <Nav pullRight>
                              <LinkContainer to="/users">
                                <NavItem eventKey={1}> Εγγραφή </NavItem>
                              </LinkContainer>
                           </Nav>

                            <Navbar.Form pullRight>
                                  <FormGroup>
                                    {/* <FormControl type="text" placeholder="Search" /> */}
                                    <LogInForm/>
                                  </FormGroup>
                                </Navbar.Form>




                          </Navbar.Collapse>
                        </Navbar>

                  </div>
                );
            }}
        />
    );
};

export default Navigation;
