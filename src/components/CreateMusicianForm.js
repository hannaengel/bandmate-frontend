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
            instruments: [],
            genres: [],
            spotify: '',
            soundcloud: '',
            instagram: '',
            facebook: '',
            image_url: 'http://mpmco.com/wp-content/uploads/2018/02/placeholder.jpg',
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
            musician: {...this.state.musician, instruments: instruments}
         }, ()=> console.log('PARENT STATE', this.state.musician));
    }

    handleChange = event => {
        const {name, value} =event.target;

        this.setState({
           musician: {...this.state.musician, [name]: value}
        }, ()=> console.log(this.state));
    }
    updateGenres = genres =>{
        this.setState({
            musician: {...this.state.musician, genres: genres}
         }, ()=> console.log('PARENT STATE', this.state));
    }
    
    createMusician = () =>{
        console.log('IN CREATE MUSICIAN STATE', this.state)
        const URL = 'http://localhost:3000/api/v1/musicians'
        const {username, email, password, name, spotify,soundcloud, instagram, facebook, image_url, bio} = this.state.musician
        const instruments = this.state.musician.instruments.join(' ')
        const genres = this.state.musician.genres.join(' ')
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({musician: {
                username: username, 
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
        })
           
    }
  
    handleSubmit = e =>{
        e.preventDefault()
        console.log('handle submit')
        this.createMusician()
        this.toggle()
    }

    toLogin = () =>{
        this.props.history.push('/login')
    }


    render() {
        return(
            <div>
            <NavBar />  
            {this.state.created===false?
            <Form onSubmit={this.handleSubmit}>
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
                            <React.Fragment>
                                <Form.Field onChange={this.handleChange}>
                                <label>Username</label>
                                <input name='username' placeholder='username'/>
                                </Form.Field>

                                <Form.Field  onChange={this.handleChange}>
                                <label>Password</label>
                                <input type="password" name='password' placeholder='password'/>
                                </Form.Field>
                            </React.Fragment>
                        </div>
                
                    <div class="eight wide column">
                        <React.Fragment>
                            <Form.Field  onChange={this.handleChange}>
                            <label>Email Contact</label>
                            <input type="email" name='email' placeholder='email'/>
                            </Form.Field>

                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="file upload icon"></i>
                                    Profile Photo URL</label>
                                <input type="text" placeholder='paste image url here' name='image_url' />
                                  <img src={this.state.musician.image_url}/>
                            </Form.Field>
                        </React.Fragment>
                    </div>
            
                        
                    <div class="eight wide column">
                        <div>
                            <Form.Field  onChange={this.handleChange}>
                            <label> Display Name</label>
                            <input name='name' placeholder='name'/>
                            </Form.Field>

                            <Form.Field  onChange={this.handleChange}>
                            <label>Bio</label>
                            <textarea type="text" name='bio' placeholder='bio here'/>
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
                        </div>
                    </div>
               
                 </div>
    
                <div class="row">

                    <div class="four wide column">
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                            <i class="instagram icon"></i>
                            Instagram </label>
                            <input type="text" placeholder='paste instragram profile link here' name='instagram' />
                         </Form.Field>
                    </div>

                    <div class="four wide column">
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                            <i class="facebook icon"></i>
                            Facebook</label>
                            <input type="text" placeholder='paste facebook page link here' name='facebook' />
                         </Form.Field>
                    </div>

                     
                    <div class="four wide column">
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="spotify icon"></i>
                                Spotify </label>
                            <input type="text" placeholder='spotify embed link here' name='spotify' />
                         </Form.Field>
                    </div> 

                    <div class="four wide column">
                        <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="soundcloud icon"></i>
                                Soundcloud </label>
                            <input type="text" placeholder='paste soundcloud username here' name='soundcloud' />
                         </Form.Field>
                     </div>
                </div>   

             <div class="row">
                    <div class="column center-div-items">
                        <Form.Field>
                        <input className='ui orange button' type='submit' value='create musician' />
                            {/* <Button onClick={this.backToLogin}>Return to Login</Button> */}
                        </Form.Field>
                    </div>
                </div>
            </div>
         </div>
        </Form>
                :
        <Grid centered columns={2} padded='vertically'>
            <div className='row'>
                 <h3>Created!</h3>
            </div>
            <div className='row'>
                 <Link to="/login"> Log In?</Link>
            </div>
         </Grid>
        }
     </div>
    )}
}
