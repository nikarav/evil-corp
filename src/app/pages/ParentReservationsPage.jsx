import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  parentReservationsContainer from '../containers/parentReservationsContainer';
import { Block, Inline } from 'jsxstyle';


const ParentReservationsPage = () => {
    return (
      <Route render={() => {
        return (
          <Block
          backgroundColor = "#E0FFFF"

            marginTop={60}>
            <Navigation />
            <Inline
              margin={30}>
              <parentReservationsContainer/>
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ParentReservationsPage;
