import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  ResetParent from '../containers/ResetParent.jsx';
import { Block, Inline } from 'jsxstyle';
import NotificationComponent from '../components/NotificationComponent';

const ResetParentPage = () => {
    return (
      <Route render={() => {
        return (
          <Block
          backgroundColor = "#E0FFFF"

            marginTop={60}>
            <Navigation />
            <NotificationComponent />
            <h1> Ξεχάσατε τον κωδικό σας! </h1>
            <Inline
              margin={30}>
              <ResetParent />
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ResetParentPage;
