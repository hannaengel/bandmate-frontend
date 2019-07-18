import React, { Component }from 'react';
import './App.css';
import Facebook from './components/Facebook';
import FilterContainer from './components/FilterContainer';
import Login  from './components/Login.js'
import LandingPage from './LandingPage';
import CreateBandForm from './components/logincomponents/CreateBandForm';




class App extends Component {

  constructor() {
    super();
    this.state = {
      band_id: null,
      isBand: null,
      token: ["token_hash, user, expiration (datetimestamp)"] // dictionary, not list
    };
  }
  getProfile = () => {
    let token = localStorage.getItem("jwt")
    console.log(token)
    fetch('http://localhost:3000/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res=>res.json())
    .then(json=> {
      console.log('Json Band', json.band)
    })
  }
  render(){
    return (
      <div>
        <CreateBandForm getProfile={this.getProfile}/>
      </div>
    );
  }
}

export default App;
