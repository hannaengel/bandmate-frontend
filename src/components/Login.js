import React, { Component } from 'react'
import CreateBandForm from './CreateBandForm.js'
import Facebook from './Facebook.js';
import NavBar from './NavBar'


export default class Login extends Component {

//state here
    render() {
        return( 
            <div>
                <NavBar />
                <Facebook />
            </div>
        )
    }
}