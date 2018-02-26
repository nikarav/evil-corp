import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import SignUpUserForm from '../containers/SignUpUserForm';
import SignUpProviderForm from '../containers/SignUpProviderForm';
import { Block } from 'jsxstyle';
import {Tabs , Tab} from 'react-bootstrap';
import NotificationComponent from '../components/NotificationComponent';


const Users = () => {
    return (
      <Route render={() => {
        return (
          <Block
            marginTop={60}
            marginLeft={500}
            marginRight={500}
            color="#0084b4"
            backgroundColor = "#DCDCDC"
            borderRadius={50}>
            <Navigation />
            <NotificationComponent />

            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="User"  >
              <SignUpUserForm />
             </Tab>

             <Tab eventKey={2} title="Provider">
            <SignUpProviderForm />
            </Tab>

            </Tabs>
          </Block>
          )  }
    }
    />
    )
}

export default Users;
