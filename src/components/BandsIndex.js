import React, { Component } from 'react'
import NavBar from './NavBar.js'
import BandCard from './cards/BandCard.js'
import { Header } from 'semantic-ui-react'
import BandDisplayContainer from './BandDisplayContainer.js';
import icon from '../images/icon.png'
export default class BandsIndex extends Component {
    state = {bands: [], view_one: false, id: null}

    componentDidMount(){
        this.getFilteredListings()
    }
  
    displayBand = (id) =>{
        this.setState(prevState => ({
            view_one: true,
            id: id
        }), ()=> console.log(this.state.view_one))
    }
    
    returnToIndex = () =>{
        this.setState(prevState => ({
            view_one: false,
            id: null
        }), ()=> console.log(this.state))
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
                {this.state.view_one==true?
                <React.Fragment>
                    <button onClick={this.returnToIndex} className="ui labeled icon button">
                        <i class="left chevron icon"></i>
                        Back
                    </button>
                <BandDisplayContainer seeBand={this.state.id} />
                </React.Fragment>
                :
                <React.Fragment>
                <NavBar />
                <h1 class="ui large dividing center aligned icon header">
                <img class="ui large circular image" src={icon}/>
                Bands
                </h1>
                <div class="ui four column grid">
                {this.state.bands.map((band) => {
                    return   <div className="column"><BandCard displayBand={this.displayBand} key={band.id}  viewBand={this.state.viewBand} band={band}/></div>
                })}
                </div>
                </React.Fragment>}
            </div>
        )
    }
}