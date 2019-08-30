import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class Bio extends Component {

    handleClick = e =>{
        this.props.onClick(e)
    }
    render() {
        const {name, email, genres, instruments, bio} = this.props.band
       
        return( 
            <div className="ui segment">
                <h1>{name}</h1>
                <div className="ui divider"></div>
                <h4>Instruments</h4>
                <p> 
                {instruments?
                instruments:
                null}
                </p>
                <div className="ui divider"></div>
                <React.Fragment>
                <h4>Genres</h4>
                {genres?
                genres:
                null}
                <div className="ui divider"></div>
                </React.Fragment>
           
               
                <h4>Bio</h4>
                    <p>{bio} </p>
                <div className="ui divider"></div>
                <h4>Email</h4>
                <p>{email}</p>
                <div className="ui divider"></div>
                    <Button name='instagram' onClick={this.handleClick} color='instagram'>
                        <Icon name='instagram' /> Instagram
                    </Button>
                    
                    <Button name='facebook' onClick={this.handleClick} position='right' color='facebook'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                </div>
            )
    }
}