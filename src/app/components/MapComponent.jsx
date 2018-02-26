import React from 'react';
import { Block } from 'jsxstyle';
import { withScriptjs,withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

import { compose, withProps,withHandlers, withStateHandlers } from  "recompose"
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


const FaAnchor = require("react-icons/lib/fa/anchor");


const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");





class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: null,
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClustererClick = this.onMarkerClustererClick.bind(this);
  }


  onMarkerClustererClick (markerClusterer) {
    const clickedMarkers = markerClusterer.getMarkers()
    console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    console.log(clickedMarkers)
    console.log(this.props.postsList);
  }

  //
  onMarkerClick(id) {
    console.log('onMarkerClick');
    this.setState({
      activeMarker: id,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    console.log('onMapClick');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }



  render(){

    const CustomMarker = (props) => {
      const {id} = props;

      const onMarkerClick = (evt) => {
        console.log(id);
         this.onMarkerClick(id);
      }

      return (
        <Marker
        onClick={onMarkerClick}
        {...props}
        />
      );
    };


    return(
      <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 37.9838, lng: 23.7275 }}
      onClick ={this.onMapClicked}
      >
        <MarkerClusterer
        onClick={this.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
        >
          {!this.props.markers?null:
            this.props.markers.map((marker, index) => (
              console.log(typeof(marker.lat)),
              console.log(marker.lat),
              <CustomMarker
                key={index}
                id={index}
                position={{ lat: marker.lat, lng: marker.lng }}

              >
              {this.state.showingInfoWindow && this.state.activeMarker == index &&
              <InfoWindow>
                  <FaAnchor />
              </InfoWindow>}
              }
              </CustomMarker>
              )
            )
          }


          </MarkerClusterer>
      </GoogleMap>
    );
  }
}


export default withScriptjs(withGoogleMap(MapComponent));
