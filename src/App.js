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
import CreateMusicianForm  from './components/CreateMusicianForm'
import MusiciansIndex from './components/MusiciansIndex';
import Navbar from './components/NavBar'
import BandsIndex from './components/BandsIndex';





class App extends Component {

  constructor() {
    super();
    this.state = {
      current_user: null,
      logged_in: false,
      token: '',
      user_type: null ,
      this_band_logged_in: false,
      this_musicican_logged_in: false
    };
    this.getProfile(localStorage.getItem('id'))
  }

 
  getProfile = (id) => {
     let token = localStorage.getItem("jwt")
     let type = localStorage.getItem("type")

     console.log(token)
     if (type == 'band'){
        fetch('http://localhost:3000/api/v1/bands/' + id, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(res=>res.json())
        .then(json=> {
          this.setState(prevState => ({
            this_band_logged_in: true,
            logged_in: true,
            current_user: json.band,
            token: token,
            user_type: type
          }), () => this.setLocalStorage())
        })}else{
      fetch('http://localhost:3000/api/v1/musicians/' + id, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
        this.setState(prevState => ({
          logged_in: true,
          current_user: json.musician,
          user_type: type,
          this_musicican_logged_in: true,
          token: token
        }), () => this.setLocalStorage())
    })}
  }

  
  setLocalStorage = () =>{
    localStorage.setItem('user_id', this.state.user_id);
    console.log('local storage set', this.state)
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
        <Route path="/band/show" render={(props)=> <BandDisplayContainer {...props} {...this.state}  getProfile={this.getProfile}/>}/>
        <Route path="/bands/new" render={()=><CreateBandForm getProfile={this.getProfile}/>}/>
        <Route path="/home" component={LandingPage}/>
        <Route path="/login" render={(props)=> <Login {...props} getProfile={this.getProfile}/>}/>
        <Route path="/filter" component={FilterContainer}/>
        <Route path="/musician/login" component={Facebook}/>
        <Route path="/listings" render={(props)=> <ListingsPageContainer {...props} getProfile={this.getProfile}/>}/>
        <Route path="/musician/show" render={(props)=> <MuscianDisplayContainer {...props} {...this.state}  getProfile={this.getProfile}/>}/>
        <Route path="/listing/new" render={(props)=> <CreateListingForm {...props} {...this.state}/>}/>
        <Route path="/navbar" render={(props)=> <Navbar {...props} {...this.state}/>}/>
        <Route path="/musicians/new" render={()=><CreateMusicianForm getProfile={this.getProfile}/>}/>
        <Route path="/indexbands" component={BandsIndex}/>
        <Route path="/indexmusicians" component={MusiciansIndex}/>

      
      </div>
    </Router>
      
        // <CreateBandForm getProfile={this.getProfile}/>
      
    );
  }
}

export default App;
