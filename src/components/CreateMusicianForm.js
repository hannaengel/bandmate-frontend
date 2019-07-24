import React, { Component} from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import NavBar from './NavBar'
import{ Link } from 'react-router-dom'
import InstrumentsSelector from './select-components/InstrumentsSelector.js'
import GenresSelector from './select-components/GenresSelector.js'

export default class CreateBandForm extends Component {

    constructor() {
        super();
        this.state = {
            musician: {
            username: '',
            email: '',
            password: '',
            name: '',
            instruments: '',
            genres: '',
            spotify: '',
            soundcloud: '',
            instagram: '',
            facebook: '',
            image_url: '',
            bio: ''
        },
        created: false
        };
    }

    toggle = () =>{
        this.setState(prevState => ({
            created: !this.state.created
        }), ()=> console.log('STATE', this.state.created))
    }

    updateInstruments = instruments =>{
        this.setState({
            band: {...this.state.band, instruments: instruments}
         }, ()=> console.log('PARENT STATE', this.state.band.instruments));
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           musician: {...this.state.musician, [name]: value}
        }, ()=> console.log(this.state));
    }
    updateGenres = genres =>{
        this.setState({
            band: {...this.state.band, genres: genres}
         }, ()=> console.log('PARENT STATE', this.state.band.genres));
    }
    
    createMusician = () =>{
        const URL = 'http://localhost:3000/api/v1/musicians'
        const musician = this.state.musician
        console.log('inside create user, here is the state:', musician)
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
 
            body: JSON.stringify({musician})
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
        this.createMusician()
        this.toggle() 
    }

    toProfile = () =>{

    }


    render() {
 

        return(
            <div>
            <NavBar />  
            {this.state.created===false?
            <div className='create-musician-form'>              
             <div class="ui internally celled grid">
                 <div class="row">
                        <div class="eight wide column">
                        <h2 className="ui center aligned icon header">
                        <i className="circular user icon"></i>
                        Create Musician Account
                        </h2>
                        </div>
                     <div class="eight wide column">
                        <Form className='user login form'>
                            <Form.Field onChange={this.handleChange}>
                            <label>Username</label>
                            <input name='username' placeholder='username' required/>
                            </Form.Field>

                            <Form.Field  onChange={this.handleChange}>
                            <label>Password</label>
                            <input type="password" name='password' placeholder='password' required/>
                            </Form.Field>
                        </Form>
                     </div>
                    </div>
                    <div class="row">
                    <div class="eight wide column">
                        <Form>
                            <Form.Field  onChange={this.handleChange}>
                            <label> Name</label>
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
                        </Form>
                        </div>
                        
                        <div class="eight wide column">
                        <Form>
                        <Form.Field  onChange={this.handleChange}>
                        <label>Bio</label>
                        <input type="text" name='bio' placeholder='bio here' required/>
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
                        </Form>
                        </div>
                    </div>
    
                <div class="row">
                    <div class="four wide column">
                        <Form>
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="instagram icon"></i>
                                Instagram </label>
                            <input type="text" placeholder='paste instragram profile link here' name='instagram' />
                         </Form.Field>
                         </Form>
                        </div> 

                        <div class="four wide column">
                        <Form>
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="facebook icon"></i>
                                Facebook</label>
                            <input type="text" placeholder='paste facebook page link here' name='facebook' />
                         </Form.Field>
                         </Form>
                        </div>  
                        <div class="four wide column">
                        <Form>
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="spotify icon"></i>
                                Spotify </label>
                            <input type="text" placeholder='spotify embed link here' name='spotify' />
                         </Form.Field>
                         </Form>
                        </div>  
                        <div class="four wide column">
                        <Form>
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="soundcloud icon"></i>
                                Soundcloud </label>
                            <input type="text" placeholder='paste soundcloud username here' name='soundcloud' />
                         </Form.Field>
                         </Form>
                        </div> 
                        </div>   
                     <div class="row">
                    <div class="column center-div-items">
                        <Button onClick={this.handleSubmit}>Create Profile</Button>
                        <Button onClick={this.backToLogin}>Return to Login</Button>
                    </div>
                </div>
             </div>
             </div>:
              <Grid centered columns={2} padded='vertically'>
                  <div className='row'>
                 <h3>Created!</h3>
                 </div>
                 <div className='row'>
                 <Link to="/musician/show"> Go To Profile </Link>
                 </div>
                 </Grid>
             }

         </div>
        )
    }
}
