import React, { Component } from 'react'
import { Button, Icon, Grid, Header, Form} from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'
// import BandPhotoEdit from './band-show-components/BandPhotoEdit'
import Bio from './band-show-components/Bio'
import Spotify from './band-show-components/Spotify';
import BandListingsDiv from './band-show-components/BandListingsDiv';
import Soundcloud from './band-show-components/Soundcloud';
import BandLoaderHOC from '../HOC/BandLoaderHOC'
import InstrumentsSelector from './select-components/InstrumentsSelector.js'
import GenresSelector from './select-components/GenresSelector'


class BandDisplayContainer extends Component {

    constructor() {
        super();
        this.state = {
            band: {
            id: '',
            username: '',
            email: '',
            name: '',
            instruments: [],
            genres: [],
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
        },
        loaded: false
        };
    }

     componentDidMount(){
        if (this.props.this_band_logged_in){
            this.fetchLoggedInBand()
        }
    }

    updateInstruments = instruments =>{
        this.setState(prevState => ({
            band: {...this.state.band, instruments: instruments}
        }), ()=> console.log(this.state.band))
    }

    updateGenres = genres =>{
        this.setState(prevState => ({
            band: {...this.state.band, genres: genres}
        }), ()=> console.log(this.state.band))
    }
    
    
    fetchLoggedInBand = () => {
        const id = this.props.current_user.id
        const url = 'http://localhost:3000/api/v1/bands/' + id
        console.log('in fetch bands', url, id)
        return fetch(url)
        .then(res=>res.json())
        .then(data => {this.setState(prevState => ({
            band: data.band
        }), ()=> console.log('seeing band as musician ',this.state, url))}
        );
    }

    handleClick = event => {
        event.preventDefault()
        console.log(event.target.name)
        const name = event.target.name
        if (name == 'instagram' && this.state.band.instagram!==''){
            window.open(this.state.band.instagram, '_blank')
        }
        if (name == 'facebook' && this.state.band.facebook!==''){
            window.open(this.state.band.facebook, '_blank')
        }  
    }

    handleEditClick = () =>{
        this.setState(prevState => ({
            viewMode: {editView: !prevState.viewMode.editView}}))
    }

    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            band: {...this.state.band, [name]: value}
        }), ()=> console.log(this.state.band))
    }


    handleSubmit = e => {
        e.preventDefault();
        let token = localStorage.getItem("jwt")
        this.handleEditClick();
        console.log('inside handle edit submit')
        const url = `http://localhost:3000/api/v1/bands/${this.props.current_user.id}`
        const {id, username, email, name, spotify, soundcloud, instagram, facebook, image_url, listings, bio} = this.state.band
        let instruments;
            if (Array.isArray(instruments)){
            instruments = this.state.band.instruments.join(' ')
            }else{
            instruments = this.state.band.instruments
            }
            let genres;
            if (Array.isArray(genres)){
            genres = this.state.band.genres.join(' ')
            }else{
            genres = this.state.band.genres
            }
        fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
             band: {
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
                listings:listings,
                bio: bio
            }
            })
         })
        .then(res=>res.json())
        .then(json => {
        })
      this.fetchLoggedInBand()
    }

    removeListing = (listing) => {
        console.log('in remove listing')
        const id = listing.id
        const url =`http://localhost:3000/api/v1/listings/${id}`
        console.log(url, id)
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }})
        .then(res=>res.json())
        .then(json => {
          console.log('REMOVED Listing', json)
        })     
    }

    renderBandInfo =()=> {
        const {facebook, instagram, bio, name, email, image_url, spotify, soundcloud} = this.state.band
       
        return(
            <React.Fragment> 
            <form class="ui form">
            <NavBar />

            {this.state.viewMode.editView==false? 
             <div onClick={this.handleEditClick} className='shadow teal-header'>
             <h4 class="ui icon header center aligned">
                        <h1 className='big-white-text'>My Band Profile<i className='users icon'></i>
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
        </div>}
            <div className='band-profile-div'>
            <div class="ui relaxed grid">
                <Grid.Row stretched>

                    <div class="ten wide column">
                    {this.state.viewMode.editView===false?
                        <BandPhoto image_url={this.state.band.image_url}/>:
                        <React.Fragment>
                           <BandPhoto image_url={this.state.band.image_url}/>
                        
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
                            <label>Bio</label>
                            <input name='bio' placeholder={bio}/>
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
                 {this.state.viewMode.editView===false?
                 <Grid.Row stretched>
                    <div class="six wide column">
                        <Spotify spotify={spotify} />
                    </div>
                    <div class="four wide column">  
                        <Soundcloud soundcloud={soundcloud}/>
                    </div>
                    <div class="six wide column">
                       <BandListingsDiv onDelete={this.removeListing} editView={this.state.viewMode.editView} band={this.state.band} email={this.state.band.email} listings={this.state.band.listings} />
                    </div>
                </Grid.Row>: 
                <Grid.Row stretched>
                        <div class="six wide column">
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="file upload icon"></i>
                                Band Photo URL</label>
                            <input type="text" placeholder={image_url} name='image_url' />
                            </Form.Field>
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="spotify icon"></i>
                                Spotify </label>
                            <input type="text" placeholder={spotify}  name='spotify' />
                        </Form.Field>
                       
                            <Form.Field  onChange={this.handleChange}>
                            <label >
                                <i class="soundcloud icon"></i>
                                Soundcloud </label>
                            <input type="text" placeholder={soundcloud} name='soundcloud' />
                        </Form.Field>

                        <Form.Field id='instruments'>
                            <label>Instruments</label>
                          <InstrumentsSelector updateInstruments={this.updateInstruments}/>
                        </Form.Field> 
                        <Form.Field id='genres'>
                            <label>Genres</label>
                          <GenresSelector updateGenres={this.updateGenres}/>
                        </Form.Field> 

                        </div>
                    <div class="ten wide column">
                       <BandListingsDiv onDelete={this.removeListing} updateListings={this.updateListings} editView={this.state.viewMode.editView} email={this.state.band.email} band={this.state.band} listings={this.state.band.listings} />
                    </div>
                     </Grid.Row>}   
                    </div>
                </div> 
            </form>

     </React.Fragment>
        )
    }

    render() {
        return this.renderBandInfo()
    }
}

export default BandLoaderHOC(BandDisplayContainer)