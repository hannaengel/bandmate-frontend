import React, { Component } from 'react'
import NavBar from './NavBar.js'
import BandCard from './cards/BandCard.js'

export default class BandsIndex extends Component {
    state = {bands: []}

    componentDidMount(){
        this.getFilteredListings()
    }
    
    getFilteredListings = () =>{
        const url = 'http://localhost:3000/api/v1/bands'
        console.log(url)
        console.log(this.state.search)
      fetch(url)
      .then(res=>res.json())
      .then(data => {this.setState(prevState => ({
            bands: data
        }), ()=> console.log('bands', this.state.bands))}
    );
    }
    render() {
        return( 
            <div>
                <NavBar />
                {this.state.bands.map((band) => {
                    return   <div className="column"><BandCard key={band.id}  band={band}/></div>
                })}
                
            </div>
        )
    }
}