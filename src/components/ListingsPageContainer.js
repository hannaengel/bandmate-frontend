import React, { Component } from 'react'
import ListingAccordian from '/Users/hannaengel/Development/projects/practice-app/src/components/listings-components/ListingAccordian.js'
import FilterContainer from './listings-components/filter-components/FilterContainer.js'
import { Header, Pagination } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandDisplayContainer from './BandDisplayContainer.js'
export default class ListingsPageContainer extends Component {



    constructor() {
        super();
        this.state = {
            loading: true,
            instruments_search: [],
            search: '', 
            listings: [],
            view_one: false, 
            id: null,
            page: 1,
            totalPages: 3
            }
    }

    componentDidMount(){
          fetch('http://localhost:3000/api/v1/listings')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                   listings: data
                }), () => console.log(data))}
          );
      }

      handleFilter = search =>{
          
          this.setState(prevState => ({
              search: search
          }))

         this.getFilteredListings()
      }

     displayBand = (id) =>{
      this.setState(prevState => ({
        view_one: true,
        id: id
        }), ()=> console.log('in parent function', this.state))
    }
    returnToListings = () =>{
        this.setState(prevState => ({
            view_one: false,
            id: null
        }), ()=> console.log(this.state))
    }


      updateInstruments = instruments =>{
        this.setState({
            instruments_search: instruments
         }, ()=> console.log('PARENT STATE', this.state), this.getFilteredListings());
    }

      getFilteredListings = () =>{
          const array = this.state.instruments_search
          const page = this.state.listingsIndex.page
          const instruments_search = array.join(' ')
        const search = this.state.search
          const url = 'http://localhost:3000/api/v1/listings/?page=' + page + '?search=' + search + '&instruments_search=' + instruments_search
          console.log('URL: ', url)
          
        fetch(url)
        .then(res=>res.json())
        .then(data => {this.setState(prevState => ({
              loading: false,
              listingsIndex: data
          }), ()=> console.log('filtered listings', this.state.listingsIndex))}
      );
      }
    
    handlePage = (e, {activePage}) => {
        let gotopage = {activePage}
        let pagenum = gotopage.activePage
        console.log('page num', pagenum)
        let pagestring = pagenum.toString()
        console.log('page string', pagestring)
        // const url = "http://localhost:3000/api/v1/listings/?page=" + pagestring
        // fetch(url)
        //     .then(res=>res.json())
        //     .then(data => {this.setState(prevState => ({
        //         loading: false,
        //         listingsIndex: data
        //     }), ()=> console.log(this.state.listingsIndex))}
        // );
    }

    render(){
        return(
            <React.Fragment>
            
            <NavBar />
           
            {this.state.view_one==true?
                <React.Fragment>
                    <button onClick={this.returnToListings} className="ui labeled icon button">
                        <i class="left chevron icon"></i>
                        Back
                    </button>
                <BandDisplayContainer seeBand={this.state.id} />
                </React.Fragment>  
                :
            <div className='band-profile-div'>
                
                 <Header as='h1' className='dividing'> Browse Listings </Header>
                <div className='ui grid container'>
                    <div className='six wide column'>
                        <FilterContainer updateInstruments={this.updateInstruments} onFilter={this.handleFilter}/>
                     </div>
                    <div className='ten wide column'>
                    <ListingAccordian onDisplayBand={this.displayBand} listings={this.state.listings}/> 

                        <Pagination onPageChange={this.handlePage} size='mini' siblingRange='3'
                        defaultActivePage={this.state.page} 
                        totalPages={this.state.pages} /> 
                     </div>
                </div>
            </div>}
            </React.Fragment>
        )
    }
}