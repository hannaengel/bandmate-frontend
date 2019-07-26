import React, { Component } from 'react'
import { Form, Grid, Button, TextArea } from 'semantic-ui-react'
import NavBar from './NavBar'
import InstrumentsSelector from './select-components/InstrumentsSelector.js'

export default class CreateListingForm extends Component {


    constructor() {
        super();
        this.state = {
            listing: {
                title: '',
                description: '',
                instruments: [],
                band_id: ''
            },  
            created: false
        }
    }

    updateInstruments = instruments =>{
        this.setState({
            listing: {...this.state.listing, instruments: instruments}
         }, ()=> console.log('PARENT STATE', this.state.listing.instruments));
    }


    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           listing: {...this.state.listing, [name]: value}
        });
    }

    createListing= () =>{
        const URL = 'http://localhost:3000/api/v1/listings'
        const {title, description, band_id} = this.state.listing
        const instruments = this.state.listing.instruments.join(' ')
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({listing: {title: title, instruments: instruments, description: description, band_id: band_id}})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(data => {
                console.log('Data', data)})       
        }

    handleSubmit = e =>{
        e.preventDefault()
        this.createListing();
        this.toggle();
    }

    

    toggle = () =>{
        this.setState(prevState => ({
            created: !this.state.created
        }), ()=> console.log(this.state.created))
    }

    render() {

        return(
            <div>
                <NavBar />
                <div className='create-listing-form'>
    
                 {this.state.created===false?
                    <Form onSubmit={this.handleSubmit} className='ui-form'>   
                        <h1 className="ui center aligned icon header dividing">
                        Create Listing
                        </h1>
           
                        <Form.Field onChange={this.handleChange}>
                        <label>Title</label>
                        <input name='title' placeholder='' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                        <label>Band Id</label>
                        <input name='band_id' placeholder='' required/>
                        </Form.Field>

                        <Form.Field id='instruments'>
    
                            <label>Instruments Needed</label>
                          <InstrumentsSelector updateInstruments={this.updateInstruments}/>
        
                        </Form.Field> 

                        <Form.Field>
                        <label>Description</label>
                        <textarea onChange={this.handleChange} type="description" name='description' placeholder="Include date, time, location and other details"  rows="3"></textarea>
                        </Form.Field>

                        <Form.Field className='center-div-items'>
                        <input className='ui submit blue button' type='submit' value='Create Listing' />
                        </Form.Field>
                        </Form>:
                        <div>
                            <h2>Your listing was posted! </h2>
                            <button onClick={this.toggle} className='ui basic blue button'> Create Another Listing </button>
                        </div>}
                </div>
            </div>
        )
    }
}
