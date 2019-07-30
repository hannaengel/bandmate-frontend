import React, { Component } from 'react'
import NavBar from './NavBar.js'
import MusicianCard from './cards/MusicianCard.js'
import { Header } from 'semantic-ui-react'
import MusicianDisplay from './MusicianDisplay.js';
import icon from '../images/icon.png'
export default class MusiciansIndex extends Component {
    state = {musicians: [], view_one: false, id: null}

    componentDidMount(){
    this.getFilteredListings()
    }
  
    displayMusician = (id) =>{
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
        const url = 'http://localhost:3000/api/v1/musicians'
        console.log(url)
        console.log(this.state.search)
      fetch(url)
      .then(res=>res.json())
      .then(data => {this.setState(prevState => ({
            musicians: data
        }), ()=> console.log('musicians', this.state.musicians))}
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
                <MusicianDisplay seeMusician={this.state.id} />
                </React.Fragment>
                :
                <React.Fragment>
                <NavBar />
                <h1 class="ui large dividing center aligned icon header">
                <img class="ui large circular image" src={icon}/>
                Musicians
                </h1>
                <div class="ui four column grid">
                {this.state.musicians.map((musician) => {
                    return   <div className="column"><MusicianCard displayMusician={this.displayMusician} key={musician.id}  viewMusician={this.state.viewMusician} musician={musician}/></div>
                })}
                </div>
                </React.Fragment>}
            </div>
        )
    }
}