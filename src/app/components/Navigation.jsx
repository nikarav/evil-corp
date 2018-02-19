import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Route render={() => {
      return (
        <div>
          <h1>Navigation Page</h1>
          <Button>
            First button
          </Button>
        </div>
      );
    }}
    />
  );
};

export default Navigation;
