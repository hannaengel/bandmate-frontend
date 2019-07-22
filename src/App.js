import React, { Component }from 'react';
import {BrowserRouter as Router,Link, Route} from 'react-router-dom';

import './App.css';
import Facebook from './components/Facebook';
import FilterContainer from './components/listings-components/filter-components/FilterContainer';
import Login  from './components/Login.js'
import LandingPage from './LandingPage';
import CreateBandForm from './components/logincomponents/CreateBandForm';
import BandDisplayContainer from './components/BandDisplayContainer';
import ListingsPageContainer from './components/ListingsPageContainer';
import MuscianDisplayContainer from './components/MusicianDisplayContainer';
import CreateListingForm  from './components/CreateListingForm';
import Navbar from './components/NavBar'





class App extends Component {

  constructor() {
    super();
    this.state = {
      band_id: null,
      isBand: true,
      token: ["token_hash, user, expiration (datetimestamp)"] // dictionary, not list
    };
  }
  // getProfile = () => {
  //   let token = localStorage.getItem("jwt")
  //   console.log(token)
  //   fetch('http://localhost:3000/api/v1/profile', {
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(json=> {
  //     console.log('Json Band', json.band)
  //   })
  // }
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
        <Route path="/band/show" render={()=><BandDisplayContainer getProfile={this.getProfile}/>}/>
        <Route path="/band/new" render={()=><CreateBandForm getProfile={this.getProfile}/>}/>
        <Route path="/home" component={LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/filter" component={FilterContainer}/>
        <Route path="/musician/login" component={Facebook}/>
        <Route path="/listings" component={ListingsPageContainer}/>
        <Route path="/musician/show" component={MuscianDisplayContainer}/>
        <Route path="/listing/new" component={CreateListingForm}/>
      
      </div>
    </Router>
      
        // <CreateBandForm getProfile={this.getProfile}/>
      
    );
  }
}

export default App;
