import React, { Component } from 'react';

class ListView extends Component {
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("myMab").style.marginLeft = "0";
    }
    render() {
        //filtering the list
        // console.log(this.props.filteredPlaces);

        return (
            <div>



                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={this.closeNav}>&times;</a>
                    <h1>Enter a place</h1>

                    <input type='text' placeholder='search places'
                        value={this.props.query}
                        onChange={(event) => this.props.updateQuery(event.target.value)}
                        id="myInput"
                        role='search'
                        aria-label='list filter'
                        tabIndex='4'
                    />
                    <ul >
                        {this.props.filteredPlaces.map((element) => (
                            <li key={element.id} tabIndex='5' onClick={() => this.props.handelClick(element.title)}>
                                {element.title}
                            </li>

                        ))
                        }

                    </ul>


                </div>
            </div>



        );
    }
}

export default ListView;
