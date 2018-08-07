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
    marker: [],
    query: '',
    filteredPlaces: myPlaces

  }
 
  updateQuery = (query) => {
    let displayingPlaces;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      displayingPlaces = myPlaces.filter((element) => match.test(element.title));

    } else {
      displayingPlaces = myPlaces;

    }
    this.setState({ filteredPlaces: displayingPlaces, query: query.trim() });
  }


  render() {
    return (
      <div className="App">
        <ListView locations={myPlaces}
          query={this.state.query}
          updateQuery={this.updateQuery}
          markers={this.state.marker}
          filteredPlaces={this.state.filteredPlaces}

        />
        <Map map={this.state.map}
          locations={myPlaces}
          markers={this.state.marker}
          query={this.state.query}
          filteredPlaces={this.state.filteredPlaces}
        />

      </div>
    );
  }
}

export default (App)