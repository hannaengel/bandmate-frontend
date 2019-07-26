import React, { Component }from 'react';
import {BrowserRouter as Router,Link, Route} from 'react-router-dom';

import './App.css';
import Facebook from './components/Facebook';
import FilterContainer from './components/listings-components/filter-components/FilterContainer';
import Login  from './components/Login.js'
import LandingPage from './LandingPage';
import CreateBandForm from './components/CreateBandForm';
import BandDisplayContainer from './components/BandDisplayContainer';
import ListingsPageContainer from './components/ListingsPageContainer';
import MuscianDisplayContainer from './components/MusicianDisplayContainer';
import CreateListingForm  from './components/CreateListingForm';
import CreateMusicianForm  from './components/CreateMusicianForm';
import Navbar from './components/NavBar'

import BandsIndex from './components/BandsIndex';





class App extends Component {

  constructor() {
    super();
    this.state = {
      band_id: null,
      band_logged_in: false,
      token: ["token_hash, user, expiration (datetimestamp)"] // dictionary, not list
    };
  }
  getProfile = () => {
     let token = localStorage.getItem("jwt")
     console.log(token)
    fetch('http://localhost:3000/api/v1/bands/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res=>res.json())
    .then(json=> {
      this.setState(prevState => ({
        band_logged_in: true
      }), ()=> localStorage.setItem('band_id', this.state.band_id))
    })
    
    console.log('git getProfile in parent')
  }
  render(){
    return (

      <Router>
      <div>
        {/* <ul>
        <li><Link to="/band/show">Band Profile</Link></li>
          <li><Link to="/band/new">Band Create Page</Link></li>
          <li><Link to="/musician/login">Musician Login</Link></li>
          <li><Link to="/home">Landing Page</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/filter">Filter Container</Link></li>
        </ul> */}
        <Route path="/band/show" render={(props)=> <BandDisplayContainer {...props} bandLoggedIn={this.state.band_logged_in}/>}/>
        <Route path="/band/new" render={()=><CreateBandForm getProfile={this.getProfile}/>}/>
        <Route path="/home" component={LandingPage}/>
        <Route path="/login" render={(props)=> <Login {...props} getProfile={this.getProfile}/>}/>
        <Route path="/filter" component={FilterContainer}/>
        <Route path="/musician/login" component={Facebook}/>
        <Route path="/listings" component={ListingsPageContainer}/>
        <Route path="/musician/show" component={MuscianDisplayContainer}/>
        <Route path="/listing/new" component={CreateListingForm}/>
        <Route path="/musicians/new" component={CreateMusicianForm}/>
        <Route path="/bands" component={BandsIndex}/>

      
      </div>
    </Router>
      
        // <CreateBandForm getProfile={this.getProfile}/>
      
    );
  }
}

export default App;
