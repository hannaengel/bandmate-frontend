import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import logo from '../images/sized-logo.png'
import ChoiceModal from './ChoiceModal.js'
export default class LoginForm extends Component {

    state = {
        username: '',
        loggedIn: false,
        type: 'band',
        show: false 
    };
    
    handleRadioChange = e  => {
        this.setState(prevState => ({
            type: e.target.value
        }), ()=> console.log(this.state))
    }
    constructor() {
        super();
        this.username = React.createRef()
        this.password = React.createRef()

    }

    getToken(jwt) {
      return localStorage.getItem('jwt')
    }

    handleChange = event => {
        const {name, value} =event.target;

       this.setState(prevState => ({
           [name]: value
       }), ()=> console.log(this.state))
    }

    login = (ev) => {
        ev.preventDefault()
        const username = this.username.current.value
        const password = this.password.current.value
        const userType = this.state.type
        let loginPath = 'login/'
        if (userType !== 'band'){
            loginPath = 'musicianlogin/'
        }
        
        console.log('state: ', this.state, userType, loginPath)
        const URL = `http://localhost:3000/api/v1/${loginPath}`
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({[userType]: {username, password}})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(json => {
                if (json && json.jwt)
                 {this.saveToken(json.jwt);
               
                this.props.getProfile()
                this.props.history.push('/' + userType + '/show');} 
            else{
                 console.log('didnt recieve token and profile back in login, Login.js:', json)
                }
            })
    }
  
    showModal = () => {
        this.setState({ show: true });
        console.log(this.state)
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
    
   

    saveToken = (token) =>{
        console.log('token saved login successful', token)
        localStorage.setItem('jwt', token)
        localStorage.setItem('type', this.state.type)
    }

    clearToken = (jwt)=> {
      localStorage.setItem('jwt', '')
    }

    handleSubmit = ()=>{
        this.login()
    }


    render() {
        let user = localStorage.getItem('jwt')
       return(
        // !this.state.loggedIn?
        //  <Redirect push to="/profile"/> :

            <div className='body'>
                {/* <NavBar /> */}
               <div className='center-div-items'>
           
                <article className ='login shadow'>
                <img src={logo} alt='' />
                <p>Not a member? <a onClick={this.showModal} className='coral-text'>Sign Up</a></p>
                <ChoiceModal show={this.state.show} handleClose={this.hideModal} />
                <Form onSubmit={this.login}>
                    <Form.Field onChange={this.handleChange}>
                     <label className='white-text' >Username</label>
                     <input name='username' type="text" placeholder='username' ref={this.username} required />
                     </Form.Field>

                     <Form.Field  onChange={this.handleChange}>
                     <label className='white-text' >Password</label>
                     <input id='loginpassword' name='password' type="password" placeholder='password' ref={this.password} required />
                     </Form.Field>
                    
                     <div class="inline fields">
                        <label className='white-text'>Log in as...</label>
                        <div class="field">
                        <div onChange={this.handleChange} class="ui radio checkbox">
                            <input value='musician' type="radio" name="type" checked="checked"/>
                            <label className='white-text'>Musician</label>
                        </div>
                        </div>

                        <div class="field">
                        <div onChange={this.handleChange}class="ui radio checkbox">
                            <input value='band' type="radio" name="type"/>
                            <label className='white-text'>Band</label>
                        </div>
                        </div>

                       
                        </div>

                     <Form.Field className='center-div-items'>
                        <input type="submit" class="large orange ui button" value="Log In" onClick={this.login}/>
                     </Form.Field>
                </Form>
                </article>
                </div>
              </div>
        )
    }
}
