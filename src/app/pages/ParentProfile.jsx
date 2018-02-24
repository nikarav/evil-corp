import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  ParentWallet from '../containers/ParentWallet.jsx';
import { Block, Inline } from 'jsxstyle';


const ParentProfile = () => {
    return (
      <Route render={() => {
        return (
          <Block
            marginTop={60}>
            <Navigation />
            <h1> Το πρoφίλ μου</h1>
            <Inline
              margin={30}>
              <ParentWallet/>
            </Inline>
          </Block>
          );  }
    }
    />
    );
}

export default ParentProfile;
