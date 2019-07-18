import React, { Component} from 'react'

import { Button, Form, Grid, Header } from 'semantic-ui-react'

export default class CreateBandForm extends Component {

    constructor() {
        super();
        this.state = {
            band: {
            username: '',
            password: ''}

        };
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           band: {...this.state.band, [name]: value}
        }, ()=> console.log(this.state));
    }

    createUser = () =>{
        const URL = 'http://localhost:3000/api/v1/bands'
        const band = this.state.band
        console.log('band', band)
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
 
            body: JSON.stringify({band})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(data => {
            console.log('JWT', data.jwt, 'Data', data)
            const token =  data.jwt
            localStorage.setItem('jwt', token);
            this.props.getProfile()
        })
           
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
                        Create Band Account
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
