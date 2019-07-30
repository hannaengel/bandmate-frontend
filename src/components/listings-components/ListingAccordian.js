import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import { identifier } from '@babel/types';

export default class ListingAccordian extends Component {
  state = { activeIndex: 0}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleContact = listing => {
    let email = listing.band.email
    let body_text = `Hello,%0D%0A%0D%0ASincerely,%0D%0AMusician`;
       window.location.href = `mailto:${email}?subject=I Am Interested In Your Posting on BandMate!&body=${body_text}`;
    }

    displayBand = (id) =>{
     this.props.onDisplayBand(id)
  }
  render() {
    const { activeIndex } = this.state
   
    let listingArray
    if (this.props.listings) {
       listingArray = this.props.listings.map((listing, index)=> {
        return (
          <React.Fragment>
             <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                <Icon name='dropdown' />
               {listing.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <section>
                <h2 className='ui dividing header'>{listing.band.name}</h2>
                <img class="ui medium image" src={listing.band.image_url}></img>
                <p>{`Instruments:   ${listing.instruments}`} </p>
                <p>{`Description:   ${listing.description}`} </p>
                <button onClick={()=>{this.handleContact(listing)}} className="ui primary button">
                  <i className='envelope icon'></i>Contact</button>
                  <button onClick={()=>{this.displayBand(listing.band.id)}} className="ui primary button">
                  <i className='users icon'></i>View Band Profile</button>
                </section>
              </Accordion.Content>
              </React.Fragment>
      )})
    }
   
    return (
      <Accordion styled>
          <React.Fragment>
            {listingArray}
          </React.Fragment>
      </Accordion>
    )
  }
}