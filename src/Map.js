import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
// import {myPlaces} from './places';
// var locations=myPlaces;
var markers = [];
var infoWindows = [];
class Map extends Component {

  //   state = {
  //     map: {},
  //  locations:myPlaces

  //   }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        var mymap = new window.google.maps.Map(document.getElementById('myMab'), {
          center: {
            lat: 26.820553,
            lng: 30.802498
          },
          zoom: 6

        });
        // this.setState({ map: mymap });
        var infoWindow = new window.google.maps.InfoWindow();
        var bounds = new window.google.maps.LatLngBounds();
        this.props.displayingPlaces.map((element) => {
          var marker = new window.google.maps.Marker({
            map: mymap,
            position: element.location,
            title: element.title,
            animation: window.google.maps.Animation.DROP,
            id: element.id
          })

          this.props.markers.push(marker);
          // this.props.markers.map(ele => {
          //   if (ele.title !== this.props.displayingPlaces[ele].title) {
          //     ele.setMap = null;
          //   }
          // })
          // this.props.filter(this.props.markers);
          bounds.extend(marker.position);
          marker.addListener('click', function () {
            populateInfoWindow(this, infoWindow);
            infoWindows.push(infoWindow);
          });


          mymap.fitBounds(bounds);
        });// this is the end of the mapping
        //this function I learnt it from lessons
        function populateInfoWindow(marker, infowindow) {
          if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>hello</div>');
            infowindow.open(mymap, marker);
            infowindow.addListener('closeclick', function () {
              infowindow.setMarker = null;
            });
            infowindow.setMarker = null;
          }

        }


      } else {
        setTimeout(() => {
          alert('the is an error');
        }, 500)
      }

    }
  }

  render() {
    console.log(this.props.displayingPlaces);
    return (
      <div id='myMab'>
      </div>
    );
  }
}

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyB_BMkMCB3RAcTv30V5ob3MrOD4-IQoLM4']
  , "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js")(Map);;



