import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import BandDisplayContainer from '../MusicianDisplayContainer';

export default class BandCard extends Component {
  
    toBandProfile = () =>{
      
     this.props.displayBand(this.props.band.id)
    }

    render() {
        const band = this.props.band
        return( 
        <React.Fragment>
            <div class="ui raised card shadow">
                <div onClick={this.toBandProfile} class="ui image">
                    <div className='card-image'>
                    <img src={band.image_url} />
                    </div>
                </div>
                <div class="content">
                    <a onClick={this.toBandProfile} class="header">{band.name}</a>
                </div>
                <div class="extra content">
                    {band.listings.length!==0?
                     <a>
                     <i class="list icon"></i>
                     Listings Posted!
                     </a>:
                     <a>
                     <i class="list icon"></i>
                     No Current Listings
                     </a>}
                   
                </div>
            </div>
            </React.Fragment>
        )
    }
}