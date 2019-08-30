import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import MusicianDisplayContainer from '../MusicianDisplayContainer';

export default class MusicianCard extends Component {
  
    toMusicianProfile = () =>{
      
     this.props.displayMusician(this.props.musician.id)
    }

    render() {
        const musician = this.props.musician
        return( 
        <React.Fragment>
            <div class="ui raised card">
                <div onClick={this.toMusicianProfile} class="ui image">
                <div className='card-image'>
                    <img src={musician.image_url}/>
                </div>
                </div>
                <div class="content">
                    <a onClick={this.toMusicianProfile} className="header center-div-items">{musician.name}</a>
                </div>
                <div class="extra content">
                   <p className='center-div-items'>{musician.instruments}</p>
                </div>
            </div>
            </React.Fragment>
        )
    }
}