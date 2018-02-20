import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import '../Css/App.css';

const Navigation = () => {
    return (
      <Route
            render={() => {
                return (
                  <div className="Navigation Component">
                    <Navbar fluid collapseOnSelect>
                      <Navbar.Header>
                        <Navbar.Brand>
                          <Link to="/">Αρχική Σελίδα</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                          <Link to="/Reservations">Κρατήσεις</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                          <Link to="/Offers">Προσφορές</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                          <Link to="/MyWallet">Πορτοφόλι</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                          <Link to="/Contact">Επικοινωνία</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                      </Navbar.Header>
                    </Navbar>
                  </div>
                );
            }}
        />
    );
};

export default Navigation;
