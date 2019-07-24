import React, { Component} from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import InstrumentsSelector from './select-components/InstrumentsSelector.js'
import GenresSelector from './select-components/GenresSelector.js'

export default class CreateBandForm extends Component {

    constructor() {
        super();
        this.state = {
            band: {
            username: null,
            email: null,
            password: null,
            name: null,
            instruments: [],
            genres: null,
            spotify: null,
            soundcloud: null,
            instagram: null,
            facebook: null,
            image_url: null
        },
        created: false
        };
    }

    toggle = () =>{
        this.setState(prevState => ({
            created: !this.state.created
        }), ()=> console.log('STATE', this.state.created))
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           band: {...this.state.band, [name]: value}
        }, ()=> console.log(this.state));
    }

    updateInstruments = instruments =>{
        this.setState({
            band: {...this.state.band, instruments: instruments}
         }, ()=> console.log('PARENT STATE', this.state.band.instruments));
    }
    updateGenres = genres =>{
        this.setState({
            band: {...this.state.band, genres: genres}
         }, ()=> console.log('PARENT STATE', this.state.band.genres));
    }

    handleSpotify = event => {
        const widget = event.target.value
        this.setState(prevState => ({
            spotify: widget
        }), ()=> console.log(this.state))
    }

    handleSoundcloud = event => {
        const widget = `<iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F${event.target.value}&color=orange_white&size=32" style="width: 32px; height: 32px;"></iframe>`
        this.setState(prevState => ({
            soundcloud: widget
        }), ()=> console.log(this.state))
    }
    

    createUser = () =>{
        const URL = 'http://localhost:3000/api/v1/bands'
        const band = this.state.band
        console.log('inside create user, here is the state:', band)
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
            // console.log('JWT', data.jwt, 'Data', data)
            // const token =  data.jwt
            // localStorage.setItem('jwt', token);
             console.log( 'Data', data)
            // this.props.getProfile()
        })
           
    }
  
    handleSubmit = ()=>{
        this.createUser()
        this.toggle()
    }


    render() {

        return(
            <div>
                <NavBar />
                 <Grid centered columns={2} padded='vertically'>
                 {this.state.created===false?
                    <Form className='create-user-form'>
                    <div className='column'>
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

                        <h1 className='ui dividing header'></h1>
                        
                        </div>
                        <div className='column'>
                       
                        <Form.Field  onChange={this.handleChange}>
                        <label>Band Name</label>
                        <input name='name' placeholder='name' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                        <label>Email Contact</label>
                        <input type="email" name='email' placeholder='email' required/>
                        </Form.Field>

                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="file upload icon"></i>
                                Band Photo URL</label>
                            <input type="text" placeholder='paste image url here' name='image_url' />
                         </Form.Field>
                        </div>

                         

                         <Form.Field id='instruments'>
                            <div  class="field">
                            <label>Instrumentation</label>
                           <InstrumentsSelector updateInstruments={this.updateInstruments}/>
                            </div>
                        </Form.Field> 

                        <Form.Field id='genres'>
                            <div class="field">
                            <label>Genre</label>
                           <GenresSelector updateGenres={this.updateGenres} />
                            </div>
                        </Form.Field> 

                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="instagram icon"></i>
                                Instagram </label>
                            <input type="text" placeholder='paste instragram profile link here' name='instagram' />
                         </Form.Field>

                         <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="facebook icon"></i>
                                Facebook</label>
                            <input type="text" placeholder='paste facebook page link here' name='facebook' />
                         </Form.Field>

                         <Form.Field  onChange={this.handleSpotify}>
                            <label >
                                <i class="spotify icon"></i>
                                Spotify </label>
                            <input type="text" placeholder='spotify embed link here' name='spotify' />
                         </Form.Field>

                         <Form.Field  onChange={this.handleSoundcloud}>
                            <label >
                                <i class="soundcloud icon"></i>
                                Soundcloud </label>
                            <input type="text" placeholder='paste soundcloud username here' name='soundcloud' />
                         </Form.Field>

                        <Form.Field>
                        <Button onClick={this.handleSubmit}>Create Profile</Button>
                        </Form.Field>

                        {/* <Form.Field>
                        <Button onClick={this.backToLogin}>Return to Login</Button>
                        </Form.Field> */}
                    </Form>: 
                    <div>
                        <div className='row'>
                            <h1>Created!</h1>
                        </div>
                        <div className='row'>
                        <Link to="/band/show"> Go To Band Profile </Link>
                        </div>
                    </div>}
                    
                </Grid>
              
            </div>
        )
    }
}
