import React, { Component } from 'react'
import { Header, Grid, Form} from 'semantic-ui-react'
import NavBar from './NavBar.js'
import BandPhoto from './band-show-components/BandPhoto'
import Bio from './band-show-components/Bio'
import Spotify from './band-show-components/Spotify';
import Soundcloud from './band-show-components/Soundcloud';


export default class MusicianDisplayContainer extends Component {

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
        }
        };
    }
    
    componentDidMount(){   
                this.fetchMusician();
    }

    fetchMusician = () => {
        const seeMusician = this.props.seeMusician
        const url = 'http://localhost:3000/api/v1/musicians/' + seeMusician
        console.log('in fetch musician', url, seeMusician)
        fetch(url)
        .then(res=>res.json())
        .then(data => {this.setState(prevState => ({
            musician: data.musician
        }), ()=> console.log('see musician as band',this.state, url))}
        );}
    

   

    handleClick = event => {
        event.target.name==='instagram'? 
        window.open(this.state.musician.instagram, '_blank'):
        window.open(this.state.musician.facebook, '_blank');
    }

 
  
    render () {
        const {facebook, instagram, name, email, bio, instruments, genre, image_url, spotify, soundcloud} = this.state.musician
        return (
        <React.Fragment> 
   
        <NavBar />
        <div className='band-profile-div'>
        <div className="ui relaxed grid">
        
            <Grid.Row stretched>
                <div className="ten wide column">   
                    <BandPhoto image_url={this.state.musician.image_url}/>
                </div>
                <div className="six wide column">
                    <Bio band={this.state.musician} onClick={this.handleClick}/>
                </div>
             </Grid.Row>

             <Grid.Row>
                <React.Fragment>
                    <div className="eight wide column">
                        <Spotify spotify={spotify} />
                        </div>
                        <div className="eight wide column">
                        <Soundcloud soundcloud={soundcloud} />
                        </div> 
                 </React.Fragment>
            </Grid.Row>
            </div>
            </div>
        
    </React.Fragment>
    )
    }
}

