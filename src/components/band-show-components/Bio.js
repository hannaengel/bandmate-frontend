import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class Bio extends Component {

    handleClick = e =>{
        this.props.onClick(e)
    }
    render() {
        const {name, email, genre, instruments, bio} = this.props.band
        return( 
            <div className="ui segment">
                <h1>{name}</h1>
                <p className="sub header">Instruments: {instruments}</p>
                <p className="sub header">Genre: {genre}</p>
                <div className="ui divider"></div>
                <p>Bio: {bio}
                </p>
                <div className="ui divider"></div>
                <h4>Email: {email}</h4>
                <div className="ui divider"></div>
                    <Button name='instagram' onClick={this.handleClick} color='instagram'>
                        <Icon name='instagram' /> Instagram
                    </Button>
                    
                    <Button onClick={this.handleClick} position='right' color='facebook'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                </div>
            )
    }
}