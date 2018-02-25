import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import  Profile from '../containers/Profile.jsx';
import { Block, Inline } from 'jsxstyle';
import { Button, FormControl, Popover , PageHeader} from 'react-bootstrap';

const header = ( <Block
                    textDecoration= "underline  "
                    color="#4B0082"
                    >
                    <h1>Το προφιλ μου </h1>
                    </Block>
                  );



const ProfilePage = () => {
    return (
      <Route render={() => {
        return (


          <Block
          marginTop={60}
          marginBot= {5}


          backgroundColor = "#E0FFFF"
          >



            <Navigation />

            <PageHeader>
  {header}
</PageHeader>

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
