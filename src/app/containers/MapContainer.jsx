import React from 'react';
import { Route } from 'react-router-dom';
import { getActivities } from '../actions/ActivityShow';
import { connect } from 'react-redux';
import MapComponent from '../components/MapComponent';


const style = {
  width: '100%',
  height: '100%'
}

class MapContainer extends React.Component {
  componentWillMount() {
      this.props.getActivities();
    }
    createMarkers(posts){
      console.log("Mphka");

              var res = posts.map(post =>
                ({ lat: post.location[0], lng: post.location[1] }));
                return res;
    }
  render(){
    const { posts, loading, error } = this.props.postsList;


    return(
      <MapComponent
googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
loadingElement={<div style={{ height: `100%` }} />}
containerElement={<div style={{ height: `400px` }} />}
mapElement={<div style={{ height: `100%` }} />}
//markers={[{lat: 37.76, lng: 23.78}, {lat: 37.86, lng: 23.88}, {lat: 38.013, lng: 23.8218}, {lat: 37.9429, lng: 23.64698}, {lat: 38.01175, lng: 23.85483} ]}
 markers={this.createMarkers(posts)}
 activityList={posts}
//markers={null}
/>

    );
  }
}
function mapStateToProps(state) {
  return {
      postsList: state.ActivityList.postsList
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {getActivities})(MapContainer);
