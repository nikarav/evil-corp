import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import AdminPanel from '../containers/AdminPanel';
import NotificationComponent from '../components/NotificationComponent';

const AdminPage = () => {
    return (
      <Route
            render={() => {
                return (
                  <Block
                        marginTop={60}>
                    <Navigation />
                    <NotificationComponent />
                    <AdminPanel />
                  </Block>
                );
            }}
        />
    );
};


export default AdminPage;
