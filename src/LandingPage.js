import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class LandingPage extends Component {


    render() {
        return( 
            <div className="ui two column relaxed centered grid">
            <div className="column"></div>
            <div className="four column centered row">
                <h1 className='ui header'> Landing Page</h1>
                <div className='ui sub header'> Select Login Option</div>
            </div>
            <div className="four column centered row">
              <div className="column">
              <button className="massive blue ui button" onClick={this.handleClick}>Musician</button> 
              </div>
              <div className="column">
              <button className="massive blue ui button" onClick={this.handleClick}>Band </button>
              </div>
            </div>
          </div>
               
                
                
          
        )
    }
}