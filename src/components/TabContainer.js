import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Tab from './Tab.js'

export default class TabsContainer extends Component{

    constructor(){
        super();
        this.state = {
            currentTab: ''}
    }

    handleClick = (event) =>{
        let tab = event.target.innerText
         this.setState(prevState => ({currentTab: tab}), () => console.log(this.state))

    }


    render(
    ){
        return(
            <React.Fragment>
                <Menu top-attached centered active>
                
                    <Tab state={this.state.currentTab} name='tab1' toggle={this.handleClick}/> 
                    <Tab state={this.state.currentTab} name='tab2' toggle={this.handleClick}/>
                    <Tab state={this.state.currentTab} name='tab3' toggle={this.handleClick}/>
                </Menu>
            </React.Fragment>
        )
    }
}

add changes