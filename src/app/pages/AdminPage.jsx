import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import { Block } from 'jsxstyle';
import AdminPanel from '../containers/AdminPanel';

const AdminPage = () => {
    return (
      <Route
            render={() => {
                return (
                  <Block
                        marginTop={60}>
                    <Navigation />
                    <AdminPanel />
                  </Block>
                );
            }}
        />
    );
};


export default AdminPage;
