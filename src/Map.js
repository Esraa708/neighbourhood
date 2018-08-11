import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
//using jsonp for solving problem of cores
import fetchJsonp from 'fetch-jsonp';

var markers = [];
var InfoWindows = [];
class Map extends Component {

    state = {
        map: {},
        load: false,
        marker: [],
        data: []
    }
    openNav() {
        document.getElementById("mySidenav").style.width = '250px';
        document.getElementById("myMab").style.marginLeft = "250px";
    }


    markers() {
        console.log(this.props.filteredPlaces)
        var infoWindow = new window.google.maps.InfoWindow();
        var bounds = new window.google.maps.LatLngBounds();
        this.props.filteredPlaces.map((element) => {
            // console.log(element)
            var marker = new window.google.maps.Marker({
                map: window.map,
                position: element.location,
                title: element.title,
                animation: window.google.maps.Animation.DROP,
                id: element.id
            })
            //Filter the data that is stored form wikipedia in the state to add them to windows info
            let bringData = this.state.data.filter((filtered) => element.name === filtered[0][0]).map(response => {
                if (response.length === 0)
                    return 'click to go to wiki search'
                else if (response[0] !== '')
                    return response[1]
                else
                    return 'click to go to wiki search'
            })
            console.log(bringData);
            console.log(this.state.data);


            let bringLink = this.state.data.filter((filtered) => element.name === filtered[0][0]).map(response => {
                if (response.length === 0)
                    return 'https://www.wikipedia.org'
                else if (response[1] !== '')
                    return response[2]
                else
                    return 'https://www.wikipedia.org'
            })
            let content =
                `<div tabIndex="0" class="infoWindow">
            <h2>${element.title}</h2>
            <p>${bringData}</p>
            <a href=${bringLink}>Click Here For More Info</a>
            
            </div>`

            infoWindow.setContent(content);
            markers.push(marker);
            InfoWindows.push(infoWindow);
            marker.addListener('click', function () {
                //Close windows before open the another
                InfoWindows.forEach(myInfo => { myInfo.close() });
                infoWindow.open(window.map, marker);
                //removing animation before adding new one
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    //animate the marker when clicked
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    setTimeout(() => { marker.setAnimation(null); }, 400)
                }
            })
            //bounds
            markers.forEach((mark) =>
                bounds.extend(mark.position))
            window.map.fitBounds(bounds)
        })
    }


    componentDidMount() {

        //I use wiki api to fetch data about location name
        this.props.filteredPlaces.map((location) => {
            return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.name}&format=json&callback=wikiCallback`)
                .then(response => response.json()).then((transformedResponse) => {
                    let updatedData = [...this.state.data, [transformedResponse, transformedResponse[1][0], transformedResponse[3][0]]]

                    this.setState(({ data: updatedData }));

                }).catch((ex) =>
                    console.error('there is an error', ex)
                )
        })
        // console.log(this.state.data);
        // this.markers;
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

            } else {
                alert('failed to load the map ')
            }

        }

    }
    render() {
        return (


            <div id='myMab' role="application" tabIndex='3'>

                {this.props.isScriptLoaded &&
                    this.markers()
                }
            </div>

        );
    }
}

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyB_BMkMCB3RAcTv30V5ob3MrOD4-IQoLM4'])(Map);