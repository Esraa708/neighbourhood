import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
// import {myPlaces} from './places';
// var locations=myPlaces;
var markers = [];
var InfoWindows = [];
class Map extends Component {

    state = {
        map: {},
        load: false,
        marker: [],


    }
    componentDidMount() {
        this.markers;
    }
    markers() {
        var infoWindow = new window.google.maps.InfoWindow();
        var bounds = new window.google.maps.LatLngBounds();
        this.props.filteredPlaces.map((element) => {
            console.log(element)
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: element.location,
                title: element.title,
                animation: window.google.maps.Animation.DROP,
                id: element.id
            })
            marker.map = window.map;
            // this.props.filteredPlaces.marker=marker;
            // this.props.markers.push(marker);
            // marker.setVisible(true);

            bounds.extend(marker.position);
            marker.addListener('click', function () {
                populateInfoWindow(this, infoWindow);
                InfoWindows.push(infoWindow);

            });


            window.map.fitBounds(bounds);
            // element.addListener('click',function(){
            //     populateInfoWindow(this,infoWindow)
            // })

            // element.addListener('click', function () {
            //     marker.setAnimation(window.google.maps.Animation.BOUNCE);

            // })
        });// this is the end of the mapping
        //this function I learnt it from lessons
        function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>hello</div>');
                infowindow.open(window.map, marker);
                infowindow.addListener('closeclick', function () {
                    infowindow.setMarker = null;
                });
                infowindow.setMarker = null;
            }
        }
    }

        // componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        //     if (isScriptLoaded && !this.props.isScriptLoaded) {
        //         this.setState({ load: true })

        //         if (isScriptLoadSucceed) {
        //             window.map = new window.google.maps.Map(document.getElementById('myMab'), {
        //                 center: {
        //                     lat: 26.820553,
        //                     lng: 30.802498
        //                 },
        //                 zoom: 9

        //             });
        //             this.markers()

        //         }

        //     }
        //     else if (this.state.load) {
        //         this.markers()

        //     }
        // }
        componentWillUpdate({ isScriptLoaded, isScriptLoadSucceed }) {
            if (isScriptLoaded && !this.props.isScriptLoaded) {
                if (isScriptLoadSucceed) {
                    window.map = new window.google.maps.Map(document.getElementById('myMab'), {
                        center: {
                            lat: 26.820553,
                            lng: 30.802498
                        },
                        zoom: 4

                    });
                    this.markers()

                }

            }

        }

        render() {
            return (
                <div id='myMab'>
                    {this.props.isScriptLoaded &&
                        this.markers()
                    }
                </div>
            );
        }
    }

    export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyB_BMkMCB3RAcTv30V5ob3MrOD4-IQoLM4'])(Map);