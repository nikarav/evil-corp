import React from 'react';
import { Route } from 'react-router-dom';


const MenuExample = () => {
    const pamedata = [{id: '1', name: 'one'}, {id: '2', name: 'two'}];
    return (
      <Route
    render={() => {
        return (
          <div>
            {pamedata.map((d, idx) => {
                    return (<li key={idx}>{d.name}</li>);
                })}
          </div>
        );
    }}
    />
);
};

export default MenuExample;
