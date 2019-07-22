import React, { Component } from 'react'
import ListingAccordian from '/Users/hannaengel/Development/projects/practice-app/src/components/listings-components/ListingAccordian.js'
import FilterContainer from './listings-components/filter-components/FilterContainer.js'
import { Header } from 'semantic-ui-react'
import NavBar from './NavBar.js'
export default class ListingsPageContainer extends Component {



    constructor() {
        super();
        this.state = {
            listings: [{title: 'one', host: 'Lake street dive', description: 'fill in', instruments: 'voice'}, {title: 'two', host: 'NAO', description: 'sub', instruments: 'banjo'}]
        };
    }


    render(){
 
        return(
            <React.Fragment>
            <NavBar />
            <div className='band-profile-div'>
                
                 <Header as='h1' className='dividing'> Browse Listings </Header>
                <div className='ui grid'>
                    <div className='six wide column'>
                    <div class="ui segment">
                        <FilterContainer />
                    </div>
                    </div>

                    <div className='ten wide column'>
                    <div class="ui segment">
                    <ListingAccordian listings={this.state.listings}/>
                    </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}