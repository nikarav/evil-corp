import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import NotificationComponent from '../components/NotificationComponent';
import  ResetProvider from '../containers/ResetProvider.jsx';
import { Block, Inline } from 'jsxstyle';

const ResetProviderPage = () => {
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
              <ResetProvider />
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ResetProviderPage;
