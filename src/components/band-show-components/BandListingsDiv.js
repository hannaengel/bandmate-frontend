import React, { Component } from 'react'
import ListingAccordian from '../listings-components/ListingAccordian'

export default class BandListingsDiv extends Component {

//state here
    render() {
        return( 
            <div class="ui segment"> 
                <h2>Current Listings</h2>
                <div class="ui divider"></div>
                <ListingAccordian />
            </div>
        )
    }
}