import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'


export default class Facebook extends Component {
constructor() {
    super();
    this.state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    };
}
    componentClicked = () =>{
        console.log('clicked')
    }
    responseFacebook = response =>{
   
        this.setState(prevState => ({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        }))
    }


    render() {
        let fbContent;
        if(this.state.isLoggedIn){
            fbContent = (
                <div style={{
                    width: '400px',
                    margin: 'auto'
                }}>
                <img src={this.state.picure} alt={this.state.name} />
                <h2>Welcome, {this.state.name}</h2>
                Email: {this.state.email}
                </div>
            )
        }else{
        fbContent =  (<FacebookLogin
        appId="473380699902028"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
        }

        return( 
            <div>
                {fbContent} 
            </div>
        )
    }
}