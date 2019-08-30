import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Tab extends Component {

handleClick = event => {
    event.persist()
    this.props.toggle(event)
}
    render(){
        return (<div>
            {this.props.state == this.props.name?
                <div name={this.props.name} className='menu item toggle-tab' onClick={this.handleClick}>
                 <h1>{this.props.name}</h1>
            </div>:
                <div name={this.props.name} className='menu item -tab' onClick={this.handleClick}>
                <h1>{this.props.name}</h1>
            </div>
            
            }
            </div>
        )
    }
}