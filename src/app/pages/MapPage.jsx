import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import MapComponent from '../components/MapComponent';
import { Block } from 'jsxstyle';


const style = {
  width: '100%',
  height: '100%'
}


const HomePage = () => {
  return (
    <Route
        render={() => {



	return (
        <Block
          marginTop={100}>
          <Navigation />
          <h1>Mapp tester testingg page</h1>

         <MapComponent
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  markers={[{lat: 37.76, lng: 23.78}, {lat: 37.86, lng: 23.88}, {lat: 38.013, lng: 23.8218}, {lat: 37.9429, lng: 23.64698}, {lat: 38.01175, lng: 23.85483} ]}
/>




			 />
        </Block>
      );
    }}
    />
  );
};

export default HomePage;
