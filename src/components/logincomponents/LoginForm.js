import React, { Component} from 'react'

import { Button, Form, Grid, Header } from 'semantic-ui-react'

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: {
            username: '',
            password: ''}
        };
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           user: {...this.state.user, [name]: value}
        }, ()=> console.log(this.state));
    }

    createUser = () =>{
        const URL = 'http://localhost:3000/api/v1/users'
        const user = this.state.user
        console.log("userInfo=", user)
        // console.log(this.state)
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(userInfo)
            body: JSON.stringify({user})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(data => {
                const jwt = data.jwt
                this.saveToken(jwt);
                console.log('JWT', jwt);
                
        }
    }

    saveToken = (token) =>{
        localStorage.setItem('jwt', token)
    }

    handleSubmit = ()=>{
        this.createUser()
    }

    render() {

        return(
            <div>
                 <Grid centered columns={2} padded='vertically'>
                    <Form className='create-user-form'>
                        <h2 className="ui center aligned icon header">
                        <i className="circular user icon"></i>
                        Create Account
                        </h2>
           
                        <Form.Field onChange={this.handleChange}>
                        <label>Username</label>
                        <input name='username' placeholder='username' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                        <label>Password</label>
                        <input type="password" name='password' placeholder='password' required/>
                        </Form.Field>

                        <Form.Field>
                        <Button onClick={this.handleSubmit}>Create Profile</Button>
                        </Form.Field>

                        <Form.Field>
                        <Button onClick={this.backToLogin}>Return to Login</Button>
                        </Form.Field>
                    </Form>
                  
                </Grid>
            </div>
        )
    }
}
