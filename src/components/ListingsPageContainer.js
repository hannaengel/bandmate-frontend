import React, { Component } from 'react'
import ListingAccordian from '/Users/hannaengel/Development/projects/practice-app/src/components/listings-components/ListingAccordian.js'
import FilterContainer from './listings-components/filter-components/FilterContainer.js'
import { Header, Pagination } from 'semantic-ui-react'
import NavBar from './NavBar.js'
export default class ListingsPageContainer extends Component {



    constructor() {
        super();
        this.state = {
            loading: true,
            instruments_search: [],
            search: '', 
            listingsIndex: {
                listings: [],
                page:'',
                pages: ''
            }
        };
    }

    componentDidMount(){
          fetch('http://localhost:3000/api/v1/listings')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                    loading: false,
                    listingsIndex: data
                }), ()=> console.log(this.state.listingsIndex))}
            );
      }

      handleFilter = search =>{
          console.log('search', search)
          this.setState(prevState => ({
              search: search
          }))

         this.getFilteredListings()
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
        let pagestring = pagenum.toString()
    
        const url = "http://localhost:3000/api/v1/listings/?page=" + pagestring
        fetch(url)
            .then(res=>res.json())
            .then(data => {this.setState(prevState => ({
                loading: false,
                listingsIndex: data
            }), ()=> console.log(this.state.listingsIndex))}
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
                        <FilterContainer updateInstruments={this.updateInstruments} onFilter={this.handleFilter}/>
                       
                    </div>
                    <div className='ten wide column'>
                    <ListingAccordian listingsIndex={this.state.listingsIndex}/> 

                        <Pagination onPageChange={this.handlePage} size='mini' siblingRange='6'
                        defaultActivePage={this.state.listingsIndex.page} 
                        totalPages={this.state.listingsIndex.pages} />
                     </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}