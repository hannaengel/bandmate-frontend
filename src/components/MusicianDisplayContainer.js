import React, { Component } from 'react'
import { Button, Icon, Grid, Form} from 'semantic-ui-react'
import ListingAccordian from './listings-components/ListingAccordian.js'
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
            musician: {
                name: 'Hanna',
                username: 'hannaengel',
                email: 'hengel@gmail.com',
                image_url: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2018/tvpatrol/02/27/kz.jpg',
                bio: 'I love music gurlllll!',
                soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/365733104&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
                instruments : 'voice',
                genre: 'pop',
                facebook: 'https://www.facebook.com/hanna.engel.92?ref=bookmarks',
                instagram: 'https://www.instagram.com/hannakahh/?hl=en',
                spotify: '<iframe src="https://open.spotify.com/embed/artist/6LuN9FCkKOj5PcnpouEgny" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'        
        },

        viewMode: {
            editView: false
        }
        };
    }
    

    handleClick = event => {
        event.target.name==='instagram'? 
        window.open(this.state.musician.instagram, '_blank'):
        window.open(this.state.musician.facebook, '_blank');
    }

    handleEditClick = event =>{
        this.setState(prevState => ({
            viewMode: {editView: !prevState.viewMode.editView}
        }));
        
    }

    handleSubmit = event =>{
        event.preventDefault();
        event.persist();
        this.handleEditClick(event);
        console.log('SUBMIT')
    }

    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            musician: {...this.state.musician, [name]: value}
        }))
    }

    render() {
        const {facebook, instagram, name, email, instruments, genre, image_url, spotify, soundcloud} = this.state.musician
       
        return( 
         
            <React.Fragment> 
                <form className="ui form">
                <NavBar />

                {this.state.viewMode.editView==false? 
                <button className='ui green button' onClick={this.handleEditClick}> Click to Edit </button> :
                <button className ='ui submit button' name='submit' onClick={this.handleSubmit}> Submit Edits </button>}
                <div className='band-profile-div'>
                <div className="ui relaxed grid">
                    <Grid.Row stretched>

                        <div className="ten wide column">
                        {this.state.viewMode.editView===false?
                            <BandPhoto image_url={this.state.musician.image_url}/>:
                            <React.Fragment>
                            <BandPhoto image_url={this.state.musician.image_url}/>
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i className="file upload icon"></i>
                                Band Photo URL</label>
                            <input type="text" placeholder={image_url} name='img_url' />
                            </Form.Field>
                            </React.Fragment>}

                        </div>
                        <div className="six wide column">
                        {this.state.viewMode.editView===false?
                            <Bio band={this.state.musician} onClick={this.handleClick}/>:
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
                                    <i className="instagram icon"></i>
                                    Instagram </label>
                                <input type="text" placeholder={instagram}  name='instagram' />
                            </Form.Field>

                            <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i className="facebook icon"></i>
                                    Facebook</label>
                                <input type="text" placeholder={facebook} name='facebook' />
                            </Form.Field>
                            </React.Fragment>
                            }
                        </div>

                     </Grid.Row>

                     <Grid.Row>
        
                        {this.state.viewMode.editView===false?
                        <React.Fragment>
                            <div className="eight wide column">
                                <Spotify spotify={spotify} />
                                </div>
                                <div className="eight wide column">
                                <Soundcloud soundcloud={soundcloud} />
                                </div> 
                         </React.Fragment>:
                         <React.Fragment>
                             <div className="eight wide column">
                                <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i className="spotify icon"></i>
                                    Spotify </label>
                                <input type="text" placeholder={spotify}  name='spotify' />
                            </Form.Field>
                            </div>
                            <div className="eight wide column">
                                <Form.Field  onChange={this.handleChange}>
                                <label >
                                    <i className="soundcloud icon"></i>
                                    Soundcloud </label>
                                <input type="text" placeholder={soundcloud}  name='soundcloud' />
                            </Form.Field>
                            </div>
                         </React.Fragment>
                        }
                    </Grid.Row>
                </div>
             </div> 
         </form>
        </React.Fragment>
         )
    }   
}
