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
    query: ''
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


    } else {
      displayingPlaces = this.state.locations;
    }
    displayingPlaces.sort(sortBy('title'));

    console.log(displayingPlaces)
    return (
      <div className="App">
        <ListView locations={this.state.locations}
          query={this.state.query}
          updateQuery={this.updateQuery}
          markers={this.state.marker}
          displayingPlaces={displayingPlaces}

        />
        <Map map={this.state.map}
          locations={this.state.locations}
          markers={this.state.marker}
          query={this.state.query}
          displayingPlaces={displayingPlaces}
        />

      </div>
    );
  }
}

export default (App)
