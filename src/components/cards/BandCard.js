import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class BandCard extends Component {


    render() {
        const band = this.props.band
        return( 
            <div class="ui card">
                <div class="ui image">
                    <img src={band.image_url}/>
                </div>
                <div class="content">
                    <a class="header">{band.name}</a>
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
        )
    }
}