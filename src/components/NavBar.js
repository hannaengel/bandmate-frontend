import React, { Component } from 'react'
import logo from '../images/logo.png'


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
               <div className="ui seven fluid item top attached menu borderless">
                <div className="item">

                <div className="item" href="http://localhost:3001/browse">
                <img src={logo} />
                </div>
                </div>

                <a href="http://localhost:3001/liked" className="item">
                Listings
                </a>
                <a className='item'></a>
              <a className='item bark-font'>
                <h2 className='bark-font'>                 </h2>
              </a>
              <a className='item'></a>
                
                <a href="http://localhost:3001/profile" className="item">
                <i className='user icon'></i>
                  {this.state.username}
                </a>
                <div className="item">
                <div onClick={this.logout} className="ui button">Log Out</div>
           
            </div>
            </div>


            </div>
        )
    }
}
