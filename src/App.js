import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import Map from './Map';
import './App.css';
import { myPlaces } from './places';
import ListView from './ListView'
class App extends Component {
  state = {
    query: '',
    filteredPlaces: myPlaces

  }
  openNav() {
    document.getElementById("mySidenav").style.width = '250px';
    // document.getElementById("myMab").style.marginLeft = "250px";
    // document.getElementById("myMab").style.width = "80%";
  }
  //to filter places in the list
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
  //when the user click on list item ,handel click should handel it
  handelClick(ele) {
    [...document.querySelectorAll('.gmnoprint > map > area')].find(m => m.title === ele).click();

  }



  render() {
    return (
      <div className="App" role='main'>
        <nav>
          <span onClick={this.openNav} tabIndex='2' className='open'>&#9776;</span>
          <header tabIndex='1'>
            <h1>Historical places in Egypt</h1>
          </header>
        </nav>


        <Map

          filteredPlaces={this.state.filteredPlaces}

        />

        <ListView
          query={this.state.query}
          updateQuery={this.updateQuery}
          filteredPlaces={this.state.filteredPlaces}
          handelClick={this.handelClick}


        />


      </div>
    );
  }
}

export default (App)
