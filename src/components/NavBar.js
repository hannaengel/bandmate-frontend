import React, { Component } from 'react'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {



    constructor() {
        super();
          this.state = {
          user_id: null,
          username: ''
        };
        // this.getProfile()
      }

    logout() {
      console.log('logout is hit!')
      localStorage.setItem('jwt', '')
      localStorage.setItem('band_id', '')
      window.location.replace("https://localhost:3001/login");
      return false
      }

    getProfile = () => {
      let token = localStorage.getItem("jwt")
      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res=>res.json())
      .then(json=> {
        console.log(json)
        this.setState({
          user_id: json.user.id,
          username: json.user.username
        })
      })
    }

    render() {
      const userType = localStorage.getItem('type')
        return(
          <React.Fragment>
          {userType == 'band'?
            <div className='navbar-fixed-top'>
               <div className="inverted gray ui six fluid item top attached menu ">
                <div className="item">

                <div className="item nav_link">
                <NavLink to="/login" activeClassName="hurray">
                <img src={logo} alt='' />
                </NavLink>
                </div>
                </div>

                <div className='item'>
                <NavLink to="/band/show" >
                <i className='user icon'></i>
                  Band Profile
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/bands" >
                <i className='user icon'></i>
                  Bands 
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/musicians" >
                <i className='user icon'></i>
                  Musicians 
                </NavLink>
                </div>

      
                <div className='item'>
                <NavLink to="/listing/new" activeClassName="hurray">
                  Create Listing
                </NavLink>
                </div>
                <div className="item">
                <div onClick={this.logout} className="ui button">Log Out</div>
               </div>
            </div>
            </div>
            :
            <div className='navbar-fixed-top'>
            <div className="inverted nav ui six top attached item menu ">
             
             <div className="item">   
             <img class="ui small bordered image" src={logo}/>
             </div>

             <div className='item'>
             <NavLink to="/musician/show" activeClassName="hurray">
             <i className='user icon'></i>
             My Profile
             </NavLink>
             </div>

             <div className='item'>
                <NavLink to="/indexbands" >
                <i className='music icon'></i>
                  Browse Bands 
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/indexmusicians" >
                <i className='users icon'></i>
                  Browse Musicians 
                </NavLink>
                </div>

             <div className='item'>
             <NavLink to="/listings" activeClassName="hurray">
             <i className='list icon'></i>
               Browse Listings
             </NavLink>
             </div>

                           
          <div className="item">
          <NavLink to="/login" activeClassName="hurray">
             <button onClick={this.logout} className="ui button">Log Out</button>
             </NavLink>
            </div>
         </div>

         </div>}
          </React.Fragment>
        )
    }
}
