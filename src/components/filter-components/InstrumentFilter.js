import React, { Component } from 'react'


export default class InstrumentFilter extends Component {

//state here
    render() {
        return( 
            <div class="ui left pointing dropdown link item">
            <input type="hidden" name="gender"/>
            <i class="dropdown icon"></i>
            <div class="default text">Insrument</div>
            <div class="menu">
                <div class="item" data-value="1">Voice</div>
                <div class="item" data-value="0">Guitar</div>
                <div class="item" data-value="2">Bass</div>
                <div class="item" data-value="3">Percussion</div>
                <div class="item" data-value="4">Keyboard</div>
                <div class="item" data-value="5">DJ</div>
            </div>
            </div>
        )
    }
}