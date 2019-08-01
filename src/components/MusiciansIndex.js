import React, { Component } from 'react'
import NavBar from './NavBar.js'
import MusicianCard from './cards/MusicianCard.js'
import { Menu } from 'semantic-ui-react'
import MusicianDisplay from './MusicianDisplay.js';
import icon from '../images/icon.png'
import NameFilter from './index-components/NameFilter.js'

export default class MusiciansIndex extends Component {
    state = {musicians: [], search: null, view_one: false, id: null, rangeStart: 0, rangeEnd: 20}

    componentDidMount(){
    this.getMusicians()
    }
  
    displayMusician = (id) =>{
        this.setState(prevState => ({
            view_one: true,
            id: id
        }), ()=> console.log(this.state.view_one))
    }
    
    returnToIndex = () =>{
        this.setState(prevState => ({
            view_one: false,
            id: null
        }), ()=> console.log(this.state))
    }

    handleSearch = search =>{
        console.log('PARENT handle search', search)
        this.setState(prevState => ({
            search: search
        }), ()=> this.getMusicians())
    }

    handleNextPage = () => {
        if(!this.state.musicians.length < this.state.rangeEnd + 20){
            this.setState(prevState => ({
                rangeStart: prevState.rangeStart + 20,
                rangeEnd: prevState.rangeEnd +20
            }), ()=> this.getMusicians())
        }else{
            console.log('not enough musicians')
        }
   }

   handlePreviousPage = () => {
        if(this.state.rangeStart >= 20){
            this.setState(prevState => ({
                rangeStart: prevState.rangeStart - 20,
                rangeEnd: prevState.rangeEnd - 20
            }), ()=> this.getMusicians())
        }else{
            console.log('not enough musicians')
        }
   }
   
        
    getMusicians = () =>{
        let url; 
        if (this.state.search){
         url = 'http://localhost:3000/api/v1/musicians?search=' + this.state.search
        }else{
         url = 'http://localhost:3000/api/v1/musicians'
        }
      fetch(url)
      .then(res=>res.json())
      .then(data => {this.setState(prevState => ({
            musicians: data.slice(this.state.rangeStart, this.state.rangeEnd)
        }), ()=> console.log('musicians', this.state.musicians))}
    );
    }
    render() {
        return( 
            <div>
                {this.state.view_one==true?
                 <React.Fragment>
                 <div className='teal-header' onClick={this.returnToIndex}>
                 <button  className="ui labeled icon teal button">
                     <i class="left chevron icon"></i>
                     Go Back
                 </button>
                 </div>
                <MusicianDisplay seeMusician={this.state.id} />
             </React.Fragment>
                :
                <React.Fragment>
                <NavBar />
           
                <div className='musicians-white-header shadow'>
                <h1 class="ui large heading-text center aligned icon header">
                <img class="ui large circular image" src={icon}/>
                Musicians
                </h1>
                </div>

                <NameFilter onSearch={this.handleSearch}/>

                <div class="ui four column grid">
                {this.state.musicians.map((musician) => {
                    return   <div className="column"><MusicianCard displayMusician={this.displayMusician} key={musician.id}  viewMusician={this.state.viewMusician} musician={musician}/></div>
                })}
                </div>

                <Menu size='massive'>
                    <Menu.Menu position='left'>
                        {this.state.rangeStart >19?
                        <Menu.Item>
                        <button className='semantic ui teal big button' onClick={this.handlePreviousPage}>
                                <i className='left arrow icon'>
                                 </i>
                         </button>
                        </Menu.Item>:
                        null}
                        </Menu.Menu>

                        <Menu.Menu position='right'>
                        {this.state.musicians.length===20?
                        <Menu.Item>
                            <button className='semantic ui teal big button' onClick={this.handleNextPage}>
                                <i className='right arrow icon'>
                                 </i>
                             </button>
                        </Menu.Item>
                        :null
                        }
                        </Menu.Menu>
                    </Menu>
                </React.Fragment>}

            </div>
        )
    }
}