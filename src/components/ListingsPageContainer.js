import React, { Component } from 'react'
import ListingAccordian from 'src/components/listings-components/ListingAccordian.js'
import FilterContainer from './listings-components/filter-components/FilterContainer.js'
import { Header, Menu , Button} from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandDisplay from './BandDisplay.js'
export default class ListingsPageContainer extends Component {


    constructor() {
        super();
        this.state = {
            instruments_search: [],
            search: null, 
            listings: [],
            // view_one: false, 
            id: null,
            rangeStart: 0,
            rangeEnd: 8
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

      handleNextPage = () => {
          if(!this.state.listings.length < this.state.rangeEnd + 8){
              this.setState(prevState => ({
                  rangeStart: prevState.rangeStart + 8,
                  rangeEnd: prevState.rangeEnd +8
              }), ()=> console.log(this.state))
          }else{
              console.log('not enough listings')
          }
     }

     handlePreviousPage = () => {
          if(this.state.rangeStart >= 8){
              this.setState(prevState => ({
                  rangeStart: prevState.rangeStart - 8,
                  rangeEnd: prevState.rangeEnd - 8
              }), ()=> console.log(this.state))
          }else{
              console.log('not enough listings')
          }
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
          console.log('updating instruments')
        this.setState(prevState => ({
            instruments_search: instruments
        }), () => this.getFilteredListings())
    }

      getFilteredListings = () =>{
          const array = this.state.instruments_search
          const instruments_search = array.join(' ')
        const search = this.state.search
        
          const url = 'http://localhost:3000/api/v1/listings/?instruments_search=' + instruments_search
          console.log('URL: ', url)
          
        fetch(url)
        .then(res=>res.json())
        .then(data => {this.setState(prevState => ({
              listings: data
          }), ()=> console.log('filtered listings', this.state.listings))}
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
        const listingsSliced = this.state.listings.slice(this.state.rangeStart, this.state.rangeEnd)
        return(
            <React.Fragment> 
            <NavBar />
           
            {this.state.view_one==true?
                 <React.Fragment>
                 <div className='teal-header' onClick={this.returnToListings}>
                 <button  className="ui labeled icon teal button">
                     <i class="left chevron icon"></i>
                     Go Back
                 </button>
                 </div>
             <BandDisplay seeBand={this.state.id} />
             </React.Fragment>
                :
                <React.Fragment>
                <div className='listings-white-header shadow'>
                 <Header as='h1' className='heading-text'> Browse Listings </Header>
                 </div>
                  {/* <div className='band-profile-div'> */}
                <div className='ui grid container'>
                    <div className='six wide column'>
                        <FilterContainer updateInstruments={this.updateInstruments} onFilter={this.handleFilter}/>
                     </div>
                    <div className='ten wide column'>
                    <ListingAccordian onDisplayBand={this.displayBand} listings={listingsSliced}/> 

                    <Menu size='large'>
                    <Menu.Menu position='left'>
                    {this.state.rangeStart >7?
                        <Menu.Item>
                        <button className='semantic ui big button' onClick={this.handlePreviousPage}>
                                <i className='left arrow icon'>
                                 </i>
                         </button>
                        </Menu.Item>
                        :null}
                        </Menu.Menu>

                        <Menu.Menu position='right'>
                        {this.state.listings?
                        <Menu.Item>
                            <button className='semantic ui big button' onClick={this.handleNextPage}>
                                <i className='right arrow icon'>
                                 </i>
                             </button>
                        </Menu.Item>:
                        null}
                        </Menu.Menu>
                    </Menu>
                     </div>
                </div>
            {/* </div> */}
            </React.Fragment>}
            </React.Fragment>
        )
    }
}