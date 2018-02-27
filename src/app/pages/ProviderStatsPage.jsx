import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  ProviderStatsContainer from '../containers/ProviderStatsContainer';
import { Block, Inline } from 'jsxstyle';


const ProfilePage = () => {
    return (
      <Route render={() => {
        return (
          <Block
          backgroundColor = "#E0FFFF"

            marginTop={60}>
            <Navigation />
            <Inline
              margin={30}>
              <ProviderStatsContainer/>
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ProfilePage;
