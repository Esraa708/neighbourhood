import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import Map from './Map';
import './App.css';
import { myPlaces } from './places';
import ListView from './ListView'
class App extends Component {
  state = {
    map: {},
    locations: myPlaces,
    marker: [],
    query: '',
    filteredPlaces:[]
    
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }



  render() {
    let displayingPlaces;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      // match.test('esraa');
      displayingPlaces = this.state.locations.filter((element) => match.test(element.title));
      // marker.setVisible(true);


    } else {
      displayingPlaces = this.state.locations;
      
    }
   

      this.state.filteredPlaces=displayingPlaces;

   
    displayingPlaces.sort(sortBy('title'));
    
   

    console.log(this.state.filteredPlaces);
    return (
      <div className="App">
        <ListView locations={this.state.locations}
          query={this.state.query}
          updateQuery={this.updateQuery}
          markers={this.state.marker}
          filteredPlaces={this.state.filteredPlaces}

        />
        <Map map={this.state.map}
          locations={this.state.locations}
          markers={this.state.marker}
          query={this.state.query}
          filteredPlaces={this.state.filteredPlaces}
        />

      </div>
    );
  }
}

export default (App)
