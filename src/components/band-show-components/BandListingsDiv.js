import React, { Component } from 'react'
import BandListingsAccordian from './BandListingsAccordian.js'

export default class BandListingsDiv extends Component {

//state here
    render() {
        return( 
            <div class="ui segment"> 
                <h2>Current Listings</h2>
                <div class="ui divider"></div>
                <BandListingsAccordian listings={this.props.listings} />
            </div>
        )
    }
}