import React, { Component } from 'react'
import { Form, Grid, Button, TextArea } from 'semantic-ui-react'
import NavBar from './NavBar'

export default class CreateListingForm extends Component {


    constructor() {
        super();
        this.state = {
            listing: {
                title: '',
                description: '',
                instruments: '',
                band_id: ''
            }   
        }
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           listing: {...this.state.listing, [name]: value}
        }, ()=> console.log(this.state));
    }

    createListing= () =>{
        const URL = 'http://localhost:3000/api/v1/listings'
        const listing = this.state.listing
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({listing})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(data => {
                console.log('Data', data)})       
        }

    handleSubmit = ()=>{
        this.createListing()
    }

    render() {

        return(
            <div>
                <NavBar />
                 <Grid centered columns={2} padded='vertically'>
                    <Form className='ui-form'>
                        
                        <h2 className="ui center aligned icon header">
                        Create Listing
                        </h2>
           
                        <Form.Field onChange={this.handleChange}>
                        <label>Title</label>
                        <input name='title' placeholder='' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                        <label>Band Id</label>
                        <input type="band_id" name='band_id' placeholder='' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                        <label>Instruments Needed</label>
                        <input type="instruments" name='instruments' placeholder='' required/>
                        </Form.Field>

                        <textarea onChange={this.handleChange} type="description" name='description' placeholder="Include date, time, location and other details"  rows="3"></textarea>

                        <Form.Field>
                        <Button onClick={this.handleSubmit}>Create Listing</Button>
                        </Form.Field>

                      
                    </Form>
                  
                </Grid>
            </div>
        )
    }
}
