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
            band: {...this.state.band, instruments: instruments}
         }, ()=> console.log('PARENT STATE', this.state.band.instruments));
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
       this.toggle()
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
                 <Grid centered columns={2} padded='vertically'>
                 {this.state.created===false?
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

                        <Form.Field id='instruments'>
                            <div  class="field">
                            <label>Instruments Needed</label>
                          <InstrumentsSelector updateInstruments={this.updateInstruments}/>
                            </div>
                        </Form.Field> 
                        <textarea onChange={this.handleChange} type="description" name='description' placeholder="Include date, time, location and other details"  rows="3"></textarea>
                        
                        <Form.Field>
                        <Button onClick={this.handleSubmit}>Create Listing</Button>
                        </Form.Field>
                        </Form>:
                        <div>
                            <h2>Your listing was posted! </h2>
                            <button onClick={this.toggle} className='ui basic blue button'> Create Another Listing </button>
                        </div>}
                        
                    
                </Grid>
                </div>
            </div>
        )
    }
}
