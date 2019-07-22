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
            isBand: false,
            username: null,
            email: 'lakestreetdive@band.com',
            password: null,
            name: 'Lake Street Dive',
            instruments: 'drums, guitar, voice, bass',
            genre: 'soul',
            spotify: '<iframe src="https://open.spotify.com/embed/artist/3nuc29fYGlQbIrwh4yrNWd" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
            soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/200556914&color=%2334919e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
            instagram: 'https://www.instagram.com/lakestreetdive/',
            facebook: 'https://www.facebook.com/lakestreetdive/?ref=br_rs',
            image_url: 'https://live.staticflickr.com/5484/30138010132_f47ff6def1_b.jpg',
            listings: [],
            bio: 'Best Band Ever'
        },
        viewMode: {
            editView: false
        }
        };
        this.fetchListings()
    }

    fetchListings = () =>{
        console.log('in fetch listings')

          fetch('http://localhost:3000/api/v1/listings')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                    listings: data
                }), ()=> console.log(this.state.band.listings))}
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
