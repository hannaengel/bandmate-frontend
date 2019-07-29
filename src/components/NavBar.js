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
               <div className="inverted gray ui five fluid item top attached menu ">
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
            <div className="inverted gray ui five fluid item top attached menu ">
             <div className="item">

             <div className="item nav_link">
             <NavLink to="/login" activeClassName="hurray">
             <img src={logo} alt='' />
             </NavLink>
             </div>
             </div>

             <div className='item'>
             <NavLink to="/musician/show" activeClassName="hurray">
             <i className='user icon'></i>
             My Profile
             </NavLink>
             </div>

             <div className='item'>
             <NavLink to="/listings" activeClassName="hurray">
               Listings
             </NavLink>
             </div>

       

             {/* <div className='item'>
             <NavLink to="/musicians/new" activeClassName="hurray">
               Create Musician
             </NavLink>
             </div> */}
         
             <div className='item'>
             <NavLink to="/bands" activeClassName="hurray">
               Bands Index
             </NavLink>
             </div>                      
          <div className="item">
             <div onClick={this.logout} className="ui button">Log Out</div>
            </div>
         </div>


         </div>}
          </React.Fragment>
        )
    }
}
