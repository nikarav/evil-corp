import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import ActivityCreate from '../components/ActivityCreate';
import Users from '../pages/Users';
import NotificationComponent from '../components/NotificationComponent';

const ActivityNew = () => {
    return (
      <Route
            render={() => {
                return (
                  <Block
                        marginTop={60}>
                    <Navigation />
                    <NotificationComponent />
                    <ActivityCreate />
                  </Block>
                );
            }}
        />
    );
};


export default ActivityNew;
