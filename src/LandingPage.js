import React, { Component } from 'react'
import { Grid, Button} from 'semantic-ui-react'
import NavBar from './components/NavBar'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import ChoiceModal from './components/ChoiceModal.js'

export default class LandingPage extends Component {
 
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleClick = event => {
    event.persist()
    if(event.target.id==='musician'){
      console.log('musician')
      this.props.history.push('/login')
    } else{
      this.props.history.push('/login')
    }
  }

  
    render() {
        return( 
          <React.Fragment>
            <NavBar />

            <div className="ui two column relaxed centered grid">
            <div className="column"></div>
            <div className="four column centered row">
                <h1 className='ui header'> I am a...</h1>
               
            </div>
            <div className="four column centered row">
              <div className="column">
              <button className="massive blue ui button" id='musician' onClick={this.handleClick}>Musician</button> 
              </div>
              <div className="column">
              <button className="massive blue ui button" id='band' onClick={this.handleClick}>Band </button>
              </div>
            </div>
  
          <div className='sixteen wide column'>
             <h3 onClick={this.showModal} className='centered ui header'>New? Sign up</h3>
          </div>
 
          <div className='eight wide column'>
            <NavLink to="/band/new" activeClassName="hurray">
            <button className='ui basic blue button large'>Create Band</button> 
            </NavLink>
            </div>

            <div className='eight wide column'>
            <NavLink to="/musicians/new" activeClassName="hurray">
             <button className='ui basic blue button large'>Create Musician</button> 
            </NavLink>
            </div>
            </div>

            <div class="ui basic modal">
              <div class="ui icon header">
                <i class="archive icon"></i>
                Sign up as a...
              </div>
             
              <div class="actions">
                <div class="ui red basic cancel inverted button">
                  <i class="microphone icon"></i>
                  Musician
                </div>
                <div class="ui green ok inverted button">
                  <i class="guitar icon"></i>
                  Band
                </div>
              </div>
          </div>
          
          </React.Fragment>         
        )
    }
}