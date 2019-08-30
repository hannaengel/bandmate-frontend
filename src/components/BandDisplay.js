import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'

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
        this.fetchBand();
    }
    
    fetchBand = () => {
            const seeBand = this.props.seeBand
            const url = 'http://localhost:3000/api/v1/bands/' + seeBand
            console.log('in fetch bands', url, seeBand)
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

   


    render(){
        const {image_url, spotify, soundcloud} = this.state.band

        return (
            <React.Fragment> 
            <form class="ui form">
            <NavBar />

            <div className='band-profile-div'>
            <div class="ui relaxed grid">

                <Grid.Row stretched>
                    <div class="ten wide column">
                        <BandPhoto image_url={image_url}/>
                    </div>
                    <div class="six wide column">
                        <Bio band={this.state.band} onClick={this.handleClick}/>
                    </div>

                 </Grid.Row>
             
                 <Grid.Row stretched>
                    <div class="six wide column">
                    {spotify?
                        <Spotify spotify={spotify} />:
                        <h4 className='white-text'>No Spotify Available</h4>}
                    </div>
                    <div class="four wide column">  
                        {soundcloud? 
                        <Soundcloud soundcloud={soundcloud}/>:
                        <h4 className='white-text'>No Soundcloud Available</h4>}
                    </div>
                    <div class="six wide column">
                       <BandListingsDiv onDelete={this.removeListing} email={this.state.band.email} editView={this.state.viewMode.editView} band={this.state.band} listings={this.state.band.listings} />
                    </div>
                </Grid.Row>
                    </div>
                </div> 
            </form>
     </React.Fragment>
        )
    }
}

