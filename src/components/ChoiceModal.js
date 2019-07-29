import React, { Component } from 'react'
//import other files here

export default class ChoiceModal extends Component {

//state here
    render() {
        return( 
          
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
        )
    }
}