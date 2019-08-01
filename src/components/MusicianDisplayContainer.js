import React, { Component } from 'react'
import { Button, Header, Grid, Form} from 'semantic-ui-react'
import ListingAccordian from './listings-components/ListingAccordian.js'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'
import Bio from './band-show-components/Bio'
import Spotify from './band-show-components/Spotify';
import Soundcloud from './band-show-components/Soundcloud';
import BandLoaderHOC from '../HOC/BandLoaderHOC'
import InstrumentsSelector from './select-components/InstrumentsSelector.js'
import GenresSelector from './select-components/GenresSelector'

class MusicianDisplayContainer extends Component {

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
                instruments : [],
                genres: [],
                facebook: '',
                instagram: '',
                spotify: ''        
        },

        viewMode: {
            editView: false
        }
        };
    }
    

    componentDidMount(){
            this.fetchLoggedInMusician()
    }

    updateInstruments = instruments =>{
        this.setState(prevState => ({
            musician: {...this.state.musician, instruments: instruments}
        }), ()=> console.log(this.state.musician))
    }

    updateGenres = genres =>{
        this.setState(prevState => ({
            musician: {...this.state.musician, genres: genres}
        }), ()=> console.log(this.state.musician))
    }


    fetchLoggedInMusician = () => {
        console.log('in fetch logged in musician, props are these', this.props.current_user)
        const id = this.props.current_user.id
        const url = 'http://localhost:3000/api/v1/musicians/' + id
        console.log('see Musician that is logged in profile style', url, id)
        return fetch(url)
        .then(res=>res.json())
        .then(data => {this.setState(prevState => ({
            musician: data.musician
        }), ()=> console.log('seeing band as musician ',this.state, url))}
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
        let token = localStorage.getItem("jwt")
        console.log('inside handle edit submit', this.state.musician)
        const id = this.props.current_user.id
        const url = `http://localhost:3000/api/v1/musicians/${id}`
        const {username, email, name, spotify, soundcloud, instagram, facebook, image_url, bio} = this.state.musician
        let instruments;
        let genres;
            if (Array.isArray(this.state.musician.instruments)){
            instruments = this.state.musician.instruments.join(' ')
            }else{
            instruments = this.state.musician.instruments
            } 
            if (Array.isArray(this.state.musician.genres)){
            genres = this.state.musician.genres.join(' ')
            }else{
            genres = this.state.musician.genres
            }
        fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                musician: {
                    id: id,
                    username: username,
                    email: email,
                    name: name,
                    instruments: instruments,
                    genres: genres,
                    spotify: spotify,
                    soundcloud: soundcloud,
                    instagram: instagram,
                    facebook: facebook,
                    image_url: image_url,
                    bio: bio
                }
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

    renderMusicianInfo = () =>{
        const {facebook, instagram, name, email, bio, instruments, genres, image_url, spotify, soundcloud} = this.state.musician
        return (
        <React.Fragment> 
            <div className='background'>
        <form className="ui form">
        <NavBar />

        {this.state.viewMode.editView==false? 
        <div onClick={this.handleEditClick} className='shadow teal-header'>
            <h4 class="ui icon header center aligned">
                       <h1 className='big-white-text'>My Profile<i className='user icon'></i>
                       </h1>
            </h4>
            <div class="sub header right aligned teal">
            <button className='ui small teal button' >  <i class="edit icon"></i>Click for Edit Mode </button> 
             </div>
        </div>
        :
        <div onClick={this.handleSubmit} className='shadow teal-header'>
            <h4 class="ui header center aligned teal">
              <div class="sub header">
                   <button className ='ui small teal button' name='submit'> <i class="huge save icon"></i>Submit Edits </button>
                 </div>
            </h4>
        </div>
        }

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
                    <Form.Field id='genres'>
                            <label>Genre(s) Needed</label>
                          <GenresSelector updateGenres={this.updateGenres}/>
                        </Form.Field> 
                    
                    </div>
                    <div className="eight wide column">
                        <Form.Field  onChange={this.handleChange}>
                        <label >
                            <i className="soundcloud icon"></i>
                            Soundcloud </label>
                        <input type="text" placeholder={soundcloud}  name='soundcloud' />
                    </Form.Field>
                    <Form.Field id='instruments'>
                            <label>Instruments</label>
                          <InstrumentsSelector updateInstruments={this.updateInstruments}/>
                        </Form.Field> 
                    </div>
                 </React.Fragment>
                }
            </Grid.Row>
            </div>
        </div> 
    </form>
    </div>
    </React.Fragment>)
    }

    render() { 
        return  this.renderMusicianInfo() 
    }   
}

export default BandLoaderHOC(MusicianDisplayContainer)
