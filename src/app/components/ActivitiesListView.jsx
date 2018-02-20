import React from 'react';
import { Route } from 'react-router-dom';

const pamedata = [{id: '1', name: 'one'}, {id: '2', name: 'two'}];

const MenuExample = () => {
    return (
      <Route
    render={() => {
        const data = this.props.pamedata;
        return (
          <div>
            {data.map((d, idx) => {
                    return (<li key={idx}>{d.name}</li>);
                })}
          </div>
        );
    }}
    />
);
};

export default MenuExample;
