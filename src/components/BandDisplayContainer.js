import React, { Component } from 'react'

import { Button, Icon, Grid, Form} from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'
import BandPhotoEdit from './band-show-components/BandPhotoEdit'
import Bio from './band-show-components/Bio'
import Spotify from './band-show-components/Spotify';
import BandListingsDiv from './band-show-components/BandListingsDiv';
import Soundcloud from './band-show-components/Soundcloud';
export default class BandDisplayContainer extends Component {

    constructor() {
        super();
        this.state = {
            band: {
            username: '',
            email: '',
            name: '',
            instruments: '',
            genre: '',
            spotify: '',
            soundcloud: '',
            instagram: '',
            facebook: '',
            image_url: '',
            listings: [],
            bio: ''
        },
        viewMode: {
            editView: false
        }
        };
        this.fetchListings()
    }
    fetchListings = () =>{
        console.log('in fetch bands')

          fetch('http://localhost:3000/api/v1/bands')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                    band: data[2]
                }), ()=> console.log(this.state.band))}
            );
      }

    handleClick = event => {
        event.target.name==='instagram'? 
        window.open(this.state.band.instagram, '_blank'):
        window.open(this.state.band.facebook, '_blank');
    }

    handleEditClick = event =>{
        this.setState(prevState => ({
            viewMode: {editView: !prevState.viewMode.editView}
        }))
    }

    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            band: {...this.state.band, [name]: value}
        }), ()=> console.log(this.state.band))
    }

    handleSubmit = event =>{
        event.preventDefault();
        event.persist();
        this.handleEditClick(event);
        console.log('SUBMIT', this.state.band)
    }

    render() {
        const {facebook, instagram, name, email, instruments, genre, image_url, spotify, soundcloud} = this.state.band
       
        return( 
         
            <React.Fragment> 
                <form class="ui form">
                <NavBar />

                {this.state.viewMode.editView==false? 
                <button className='ui green button' onClick={this.handleEditClick}> Click to Edit </button> :
                <button className ='ui submit button' onClick={this.handleEditClick}> Submit Edits </button>}
                <div className='band-profile-div'>
                <div class="ui relaxed grid">
                    <Grid.Row stretched>

                        <div class="ten wide column">
                        {this.state.viewMode.editView===false?
                            <BandPhoto image_url={this.state.band.image_url}/>:
                            <React.Fragment>
                            <BandPhoto image_url={this.state.band.image_url}/>
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="file upload icon"></i>
                                Band Photo URL</label>
                            <input type="text" placeholder={image_url} name='img_url' />
                            </Form.Field>
                            </React.Fragment>}

                        </div>
                        <div class="six wide column">
                        {this.state.viewMode.editView===false?
                            <Bio band={this.state.band} onClick={this.handleClick}/>:
                            <React.Fragment>
                            <Form.Field  onChange={this.handleChange}>
                                <label>Band Name</label>
                                <input name='name' placeholder={name}/>
                            </Form.Field>
                            <Form.Field  onChange={this.handleChange}>
                                <label>Email Contact</label>
                                <input type="email" name='email' placeholder={email} required/>
                            </Form.Field>
                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="instagram icon"></i>
                                    Instagram </label>
                                <input type="text" placeholder={instagram}  name='instagram' />
                            </Form.Field>

                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i class="facebook icon"></i>
                                    Facebook</label>
                                <input type="text" placeholder={facebook} name='facebook' />
                            </Form.Field>
                            </React.Fragment>
                            }
                        </div>

                     </Grid.Row>

                     <Grid.Row stretched>
                        <div class="six wide column">
                        {this.state.viewMode.editView===false?
                            <Spotify spotify={spotify} />:
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="spotify icon"></i>
                                Spotify </label>
                            <input type="text" placeholder={spotify}  name='spotify' />
                         </Form.Field>
                        }
                        </div>
                        <div class="four wide column">  
                        {this.state.viewMode.editView===false?       
                            <Soundcloud soundcloud={soundcloud}/>:
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="soundcloud icon"></i>
                                Soundcloud </label>
                            <input type="text" placeholder={soundcloud} name='soundcloud' />
                         </Form.Field>}
                        </div>
                        <div class="six wide column">
                        {this.state.viewMode.editView===false?
                           <BandListingsDiv listings={this.state.band.listings} />:
                           <div>Edit Listings Component here</div>}
                        </div>
                    </Grid.Row>
                </div>
                </div> 
                </form>
         </React.Fragment>
        )
    }
    
}
