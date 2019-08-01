import React, { Component } from 'react'
import NavBar from './NavBar.js'
import BandCard from './cards/BandCard.js'
import BandDisplay from './BandDisplay.js';
import icon from '../images/icon.png'
import { Menu } from 'semantic-ui-react'
import NameFilter from './index-components/NameFilter.js'

export default class BandsIndex extends Component {
    state = {bands: [], view_one: false, id: null, rangeStart: 0,
        rangeEnd: 20}

    componentDidMount(){
        this.getBands()
    }

    handleNextPage = () => {
        if(!this.state.bands.length < this.state.rangeEnd + 20){
            this.setState(prevState => ({
                rangeStart: prevState.rangeStart + 20,
                rangeEnd: prevState.rangeEnd +20
            }), ()=> this.getBands())
        }else{
            console.log('not enough bands')
        }
   }

   handlePreviousPage = () => {
        if(this.state.rangeStart >= 20){
            this.setState(prevState => ({
                rangeStart: prevState.rangeStart - 20,
                rangeEnd: prevState.rangeEnd - 20
            }), ()=> this.getBands())
        }else{
            console.log('not enough bands')
        }
   }

   handleSearch = search =>{
    console.log('PARENT handle search', search)
    this.setState(prevState => ({
        search: search
    }), ()=> this.getBands())
}

  
    displayBand = (id) =>{
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

   
        
    getBands = () =>{
        let url; 
        if (this.state.search){
         url = 'http://localhost:3000/api/v1/bands?search=' + this.state.search
        }else{
         url = 'http://localhost:3000/api/v1/bands'
        }
      fetch(url)
      .then(res=>res.json())
      .then(data => {this.setState(prevState => ({
            bands: data.slice(this.state.rangeStart, this.state.rangeEnd)
        }), ()=> console.log('bands', this.state.bands))}
    );
    }
    render() {
        return( 
            <div className='paginate'>
                {this.state.view_one==true?
                <React.Fragment>
                    <div className='teal-header' onClick={this.returnToIndex}>
                    <button  className="ui labeled icon teal button">
                        <i class="left chevron icon"></i>
                        Go Back
                    </button>
                    </div>
                <BandDisplay seeBand={this.state.id} />
                </React.Fragment>
                :
                <React.Fragment>
                <NavBar />
                <div className='white-header shadow'>
                    <h1 class="ui large center aligned icon header heading-text">
                        <img class="ui large circular image" src={icon}/>
                        Bands
                    </h1>
                </div>
                <NameFilter onSearch={this.handleSearch}/>
                <div class="ui four column grid">
                {this.state.bands.map((band) => {
                    return   <div className="column"><BandCard displayBand={this.displayBand} key={band.id}  viewBand={this.state.viewBand} band={band}/></div>
                })}
                </div>
                <div className='paginate shadow'>
                <Menu size='massive'>
                    <Menu.Menu position='left'>
                        {this.state.rangeStart >19?
                        <Menu.Item>
                        <button className='semantic ui big button' onClick={this.handlePreviousPage}>
                                <i className='left arrow icon'>
                                 </i>
                         </button>
                        </Menu.Item>:
                        null}
                        </Menu.Menu>

                        <Menu.Menu position='right'>
                        {this.state.bands.length===20?
                        <Menu.Item>
                            <button className='semantic ui big button' onClick={this.handleNextPage}>
                                <i className='right arrow icon'>
                                 </i>
                             </button>
                        </Menu.Item>
                        :null
                        }
                        </Menu.Menu>
                    </Menu>
                    </div>
                </React.Fragment>}
            </div>
        )
    }
}