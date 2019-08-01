import React, { Component } from 'react'



export default class NameFilter extends Component {

    state = {search: null}

    handleChange = e =>{
        e.persist()
        this.setState(prevState => ({
            search: e.target.value
        }), ()=>  this.props.onSearch(this.state.search))
    
    }

    render() {
        return(          
        <div onChange={this.handleChange} class="ui search">
            <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search name..."/>
                <i class="search icon"></i>
                </div>
            <div class="results"></div>
        </div>
        )
    }
}