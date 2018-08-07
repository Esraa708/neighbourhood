import React, { Component } from 'react';

class ListView extends Component {
    openNav() {
        document.getElementById("mySidenav").style.width = '250px';
        document.getElementById("myMab").style.marginLeft = '250px';
    }
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("myMab").style.marginLeft = "0";
    }
    render() {
        //filtering the list
console.log(this.props.filteredPlaces);

        return (
            <div>

                <div id="mySidenav" className="sidenav">
                    {/* <a href="#" className="closebtn" onClick={this.closeNav}>&times;</a> */}
                    <button className="closebtn" onClick={this.closeNav}>&times;</button>
                    <h1>Enter a place</h1>
         
                    <input type='text' placeholder='search places'
                     value={this.props.query} 
                     onChange={(event) =>this.props.updateQuery(event.target.value)}/>
                    <ul>
                        {this.props.filteredPlaces.map((element) => (
                            <li key={element.id} >
                                {element.title}
                            </li>

                        ))
                        }

                    </ul>


                </div>


                {/* <span onClick={this.openNav}>open</span> */}
                {/* <div className='menu' onClick={this.openNav}>
                    <div className='burger'  ></div>
                    <div className='burger'  ></div>
                    <div className='burger'  ></div>
                </div> */}

            </div>
        );
    }
}

export default ListView;
