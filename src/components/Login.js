import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Link, Redirect } from 'react-router-dom'


export default class LoginForm extends Component {

    state = {
        username: '',
        loggedIn: false
    };

    constructor() {
        super();
        this.username = React.createRef()
        this.password = React.createRef()

    }

    // if (this.getToken()) {
    //     this.props.props.getProfile()
    //   }

    getToken(jwt) {
      return localStorage.getItem('jwt')
    }



    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
            [name]: value,
        });
    }

    login = (ev) => {
        ev.preventDefault()
        const username = this.username.current.value
        const password = this.password.current.value
        console.log(this.state)
        const URL = 'http://localhost:3000/api/v1/login/'
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({band: {username, password}})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(json => {
                if (json && json.jwt)
                 {this.saveToken(json.jwt);
                this.props.getProfile()} 
            else{
                 console.log('didnt recieve token and profile back in login, Login.js:', json)
                }
            })
    }
  
    

    saveToken = (token) =>{
        console.log('token saved login successful')
        localStorage.setItem('jwt', token)
    }

    clearToken = (jwt)=> {
      localStorage.setItem('jwt', '')
    }

    handleSubmit = ()=>{
        this.login()
    }


    render() {

       return(
        // !this.state.loggedIn?
        //  <Redirect push to="/profile"/> :

            <div className='body'>
                <NavBar />
               <div className='center-div-items'>
           
                <article className ='login'>
                <h2>Sign in</h2>
                <p>Not a member? <Link to="/users/new">Sign Up</Link></p>
                
                <Form onSubmit={this.login}>
                    <Form.Field onChange={this.handleChange}>
                     <label>Username</label>
                     <input name='username' type="text" placeholder='username' ref={this.username} required />
                     </Form.Field>

                     <Form.Field  onChange={this.handleChange}>
                     <label>Password</label>
                     <input id='loginpassword' name='password' type="password" placeholder='password' ref={this.password} required />
                     </Form.Field>

                     <Form.Field className='center-div-items'>
                        <input type="submit" class="large ui button" value="Log In" onClick={this.login}/>
                     </Form.Field>
                </Form>
                </article>
                </div>
              </div>
        )
    }
}
