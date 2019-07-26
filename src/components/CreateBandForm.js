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
            genres: [],
            spotify: null,
            soundcloud: null,
            instagram: null,
            facebook: null,
            image_url: 'http://mpmco.com/wp-content/uploads/2018/02/placeholder.jpg'
        },
        created: false
        };
    }

    toggle = () =>{
        this.setState(prevState => ({
            created: !this.state.created
        }))
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           band: {...this.state.band, [name]: value}
        });
    }

    updateInstruments = instruments =>{
        this.setState({
            band: {...this.state.band, instruments: instruments}
         });
    }
    updateGenres = genres =>{
        this.setState({
            band: {...this.state.band, genres: genres}
         });
    }

    handleSpotify = event => {
        const widget = event.target.value
        this.setState(prevState => ({
            spotify: widget
        }))
    }

    handleSoundcloud = event => {
        const widget = `<iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F${event.target.value}&color=orange_white&size=32" style="width: 32px; height: 32px;"></iframe>`
        this.setState(prevState => ({
            soundcloud: widget
        }))
        }
    

    createUser = () =>{
        const URL = 'http://localhost:3000/api/v1/bands'
        const {username, email, password, name, spotify,soundcloud, instagram, facebook, image_url, bio} = this.state.band
        const instruments = this.state.band.instruments.join(' ')
        const genres = this.state.band.genres.join(' ')
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
 
            body: JSON.stringify({ band: {username: username, 
                email: email, 
                password: password, 
                name: name, 
                spotify: spotify,
                soundcloud: soundcloud, 
                instagram: instagram, 
                facebook: facebook, 
                image_url: image_url, 
                bio: bio,
                instruments: instruments,
            genres: genres}})
        }
        fetch(URL, headers)
            .then(res=>res.json())
            .then(data => {
             const token =  data.jwt
             localStorage.setItem('jwt', token);
             console.log( 'Data', data)
             this.props.getProfile()
        })
           
    }
  
    handleSubmit = e =>{
        e.preventDefault()
        this.createUser()
        this.toggle()
    }

    render() {

        return(
            <div>
                <NavBar />
                 {this.state.created===false?
                    <Form onSubmit={this.handleSubmit}>
                        <div className='create-musician-form'>
                         <div class="ui internally celled grid">
                            <div className='row'>
                             <div className='eight wide column'>
                                  <h2 className="ui center aligned icon header">
                                    <i className="circular user icon"></i>
                                     Create Band Account
                                  </h2>
                             </div>
                            <div className='eight wide column'>
                                <Form.Field onChange={this.handleChange}>
                                     <label>Username</label>
                                    <input name='username' placeholder='username'/>
                                </Form.Field>

                                <Form.Field  onChange={this.handleChange}>
                                <label>Password</label>
                                <input type="password" name='password' placeholder='password'/>
                                </Form.Field>   
                            </div>
                            
                        </div>
                     <div className='row'>
                        <div className='eight wide column'>
                                <Form.Field  onChange={this.handleChange}>
                                <label>Email Contact</label>
                                <input type="email" name='email' placeholder='email'/>
                                </Form.Field>
                                <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="file upload icon"></i>
                                    Band Photo URL</label>
                                <input type="text" placeholder='paste image url here' name='image_url' />
                             </Form.Field>
                             <img src={this.state.band.image_url}/>
                         </div>
                        
                        <div className='eight wide column'>
                             <Form.Field  onChange={this.handleChange}>
                                <label>Band Name</label>
                                <input name='name' placeholder='name'/>
                                </Form.Field>
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
                                <label>Bio</label>
                                <textarea name='bio' placeholder='bio'/>
                                </Form.Field>
                         </div>
                        </div>
                        
                    <div className='row'>
                        <div className='four wide column'>
                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="instagram icon"></i>
                                    Instagram </label>
                                <input type="text" placeholder='paste instragram profile link here' name='instagram' />
                            </Form.Field>
                        </div>
                         <div className='four wide column'>
                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="facebook icon"></i>
                                    Facebook</label>
                                <input type="text" placeholder='paste facebook page link here' name='facebook' />
                            </Form.Field>
                        </div>
                        <div className='four wide column'>
                            <Form.Field  onChange={this.handleSpotify}>
                                <label >
                                    <i class="spotify icon"></i>
                                    Spotify </label>
                                <input type="text" placeholder='spotify embed link here' name='spotify' />
                            </Form.Field>
                         </div>
                         <div className='four wide column'>
                            <Form.Field  onChange={this.handleSoundcloud}>
                                <label >
                                    <i class="soundcloud icon"></i>
                                    Soundcloud </label>
                                <input type="text" placeholder='paste soundcloud username here' name='soundcloud' />
                            </Form.Field>
                        </div>
                    </div>
                    <div className='row center-div-items'>
                       <Form.Field>
                        <input className='ui button' type='submit' value='Create Band' />
                        </Form.Field>
                     </div>

                        {/* <Form.Field>
                        <Button onClick={this.backToLogin}>Return to Login</Button>
                        </Form.Field> */}
          
                     </div>
                </div>
            </Form>: 
                <div>
                    <div className='row'>
                        <h1>Created!</h1>
                    </div>
                    <div className='row'>
                        <Link to="/band/show"> Go To Band Profile </Link>
                    </div>
                </div>}
         </div>
        )
    }
}
