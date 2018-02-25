import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  Profile from '../containers/Profile.jsx';
import { Block, Inline } from 'jsxstyle';


const ProfilePage = () => {
    return (
      <Route render={() => {
        return (
          <Block
            marginTop={60}>
            <Navigation />
            <h1> Το πρoφίλ μου</h1>
            <Inline
              margin={30}>
              <Profile/>
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ProfilePage;
