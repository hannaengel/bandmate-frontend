import React, { Component } from 'react'
import Iframe from 'react-iframe'

export default class BandDisplayPage extends Component {


    render() {
        const {name, email, instruments, spotify, soundcloud, instagram, facebook, genre} = this.props.bandInfo
        return( 
            <div>
                <h1>{name}</h1>
                <div>{soundcloud}</div>
            </div>
        )
    }
}