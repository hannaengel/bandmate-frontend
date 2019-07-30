import React, { Component } from 'react'
import { Button, Icon, Grid, Header, Form} from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'
// import BandPhotoEdit from './band-show-components/BandPhotoEdit'
import Bio from './band-show-components/Bio'
import Spotify from './band-show-components/Spotify';
import BandListingsDiv from './band-show-components/BandListingsDiv';
import Soundcloud from './band-show-components/Soundcloud';
export default class BandDisplayContainer extends Component {

    constructor() {
        super();
        this.state = {
            band: {
            id: '',
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
        },
        loaded: false
        };
    }

     componentDidMount(){
        if (this.props.seeBand) {
                this.fetchBand();
            }else if (this.props.this_band_logged_in){
            this.fetchLoggedInBand()
            }

    }
    
    fetchBand = () => {
            const seeBand = this.props.seeBand
            const url = 'http://localhost:3000/api/v1/bands/' + seeBand
            console.log('in fetch bands', url, seeBand)
            return fetch(url)
            .then(res=>res.json())
            .then(data => {this.setState(prevState => ({
                band: data.band,
                loaded: true
            }), ()=> console.log('seeing band as musician ',this.state, url))}
            );
        }

        fetchLoggedInBand = () => {
            const seeBand = this.props.current_user.id
            const url = 'http://localhost:3000/api/v1/bands/' + seeBand
            console.log('in fetch bands', url, seeBand)
            return fetch(url)
            .then(res=>res.json())
            .then(data => {this.setState(prevState => ({
                band: data.band,
                loaded: true
            }), ()=> console.log('seeing band as musician ',this.state, url))}
            );
        }



    handleClick = event => {
        const type = event.target.name
        if (type == 'instagram'){
            window.open(this.state.band.instagram, '_blank')
        }else{
            window.open(this.state.band.facebook, '_blank')
        }       
    }

    handleEditClick = () =>{
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


    handleSubmit = e => {
        e.preventDefault();
        let token = localStorage.getItem("jwt")
        this.handleEditClick();
        console.log('inside handle edit submit')
        const url = `http://localhost:3000/api/v1/bands/${this.props.current_user.id}`
        const band = this.state.band
        fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
             band: band
            })
        })
      .then(res=>res.json())
      .then(json => {
      })
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
            <div className='shadow'>
            {this.props.this_band_logged_in==true?
            <button className='ui orange button' onClick={this.handleEditClick}>  <i class="edit icon"></i>Click for Edit Mode </button> 
            :null}
            <Header className='dividing'>Band</Header>
            </div>
            :
            <button className ='ui submit orange button' onClick={this.handleSubmit}> Submit Edits </button>}
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
                            <input bio='bio' placeholder={bio}/>
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
                       <BandListingsDiv onDelete={this.removeListing} editView={this.state.viewMode.editView} band={this.state.band} listings={this.state.band.listings} />
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
                        </div>
                    <div class="ten wide column">
                       <BandListingsDiv onDelete={this.removeListing} updateListings={this.updateListings} editView={this.state.viewMode.editView} band={this.state.band} listings={this.state.band.listings} />
                    </div>
                     </Grid.Row>}   
                    </div>
                </div> 
            </form>
     </React.Fragment>
        )
    }

    renderLoadingScreen = () =>{
        return (<div>
        Hold on, it's loading!
      </div>)
    }

    //  render() {
        // if (this.props.current_user) {
        //     this.renderBandInfo()
        // } else if (this.props.seeBand) {
            // this.fetchBand()
// } else {
//     this.renderLoadingScreen()
// }


    

    render() {

        if (this.state.loaded===true){
            return this.renderBandInfo();
        }else{
            return this.renderLoadingScreen()
            // return null
        }
    //    if (!this.props.seeBand){
    //     if (this.props.current_user) {
    //     this.setState(prevState => ({
    //             band: this.props.current_user,
    //             this_band_logged_in: true,
    //         }), ()=> console.log('state fetch bands after band ',this.state));
    //         return this.renderBandInfo();

    // }else if (this.props.seeBand) {
    //         this.fetchBand();
    //         return this.renderBandInfo()
    //  } else {
    //         return this.renderLoadingScreen()
    //     }
    }
}
