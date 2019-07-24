import React, { Component } from 'react'
import { Button, Header, Grid, Form} from 'semantic-ui-react'
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
                id: '',
                name: '',
                username: '',
                email: '',
                image_url: '',
                bio: '',
                soundcloud: '',
                instruments : '',
                genre: '',
                facebook: '',
                instagram: '',
                spotify: ''        
        },

        viewMode: {
            editView: false
        }
        };
        this.fetchMusicians()
    }
    
    fetchMusicians = () =>{
        console.log('in fetch musicians')

          fetch('http://localhost:3000/api/v1/musicians')
              .then(res=>res.json())
              .then(data => {this.setState(prevState => ({
                    musician: data[13]
                }), ()=> console.log(this.state.musician))}
            );
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

    handleSubmit = e => {
        e.preventDefault();
        this.handleEditClick();
        console.log('inside handle edit submit', this.state.musician)
        const id = this.state.musician.id
        const url = `http://localhost:3000/api/v1/musicians/${id}`
        const musician = this.state.musician
        fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             musician
            })
        })
      .then(res=>res.json())
      .then(json => {
        console.log(json)
      })
    }


    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            musician: {...this.state.musician, [name]: value}
        }), () => console.log(this.state.musician.bio))
    }

    render() {
        const {facebook, instagram, name, email, bio, instruments, genre, image_url, spotify, soundcloud} = this.state.musician
       
        return( 
         
            <React.Fragment> 
                <form className="ui form">
                <NavBar />
                {this.state.viewMode.editView==false? 
                <div>
                <button className='ui teal button' onClick={this.handleEditClick}>  <i class="edit icon"></i>Click for Edit Mode </button> 
                <Header className='dividing'>Musician</Header>
                </div>:
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
                                Musician Photo URL</label>
                            <input type="text" placeholder={image_url} name='image_url' />
                            </Form.Field>
                            </React.Fragment>}

                        </div>
                        <div className="six wide column">
                        {this.state.viewMode.editView===false?
                            <Bio band={this.state.musician} onClick={this.handleClick}/>:
                            <React.Fragment>
                            <Form.Field  onChange={this.handleChange}>
                                <label>Name</label>
                                <input name='name' placeholder={name}/>
                            </Form.Field>
                            <Form.Field  onChange={this.handleChange}>
                                <label>Bio</label>
                                <input name='bio' placeholder={bio}/>
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
