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
      window.location.replace("http://localhost:3001/");
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
        return(
            <div >
               <div className="ui eight fluid item top attached menu borderless">
                <div className="item">

                <div className="item nav_link">
                <img src={logo} alt='' />
                </div>
                </div>

                <div className='item'>
                <NavLink to="/musician/show" activeClassName="hurray">
                  Musician Profile
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/band/show" >
                  Band Profile
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/listings" activeClassName="hurray">
                  Listings
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/listing/new" activeClassName="hurray">
                  Create Listing
                </NavLink>
                </div>

                <div className='item'>
                <NavLink to="/band/new" activeClassName="hurray">
                  Create Band
                </NavLink>
                </div>
                
           
      
               <div  className="item">
                <i className='user icon'></i>
                  current user
                </div>

                <div className="item">
                <div onClick={this.logout} className="ui button">Log Out</div>
               </div>
            </div>


            </div>
        )
    }
}
