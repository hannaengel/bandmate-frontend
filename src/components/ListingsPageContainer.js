import React, { Component } from 'react'
import ListingAccordian from '/Users/hannaengel/Development/projects/practice-app/src/components/listings-components/ListingAccordian.js'
import FilterContainer from './listings-components/filter-components/FilterContainer.js'
import { Header } from 'semantic-ui-react'
import NavBar from './NavBar.js'
export default class ListingsPageContainer extends Component {



    constructor() {
        super();
        this.state = {
            listings: []
        };
        this.fetchListings()
    }

    fetchListings = () =>{
        console.log('in fetch listings')

          fetch('http://localhost:3000/api/v1/listings')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                    listings: data
                }), ()=> console.log(this.state.listings))}
            );
      }


    render(){
 
        return(
            <React.Fragment>
            <NavBar />
            <div className='band-profile-div'>
                
                 <Header as='h1' className='dividing'> Browse Listings </Header>
                <div className='ui grid container'>
                    <div className='six wide column'>
                        <FilterContainer />
                    </div>
                    <div className='ten wide column'>
                    <ListingAccordian listings={this.state.listings}/>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}