import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class ListingAccordian extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleContact = listing => {
    console.log('contact')
      console.log(listing)
       let email = listing.band.email
       let body_text = `Hello ${listing.band.name},%0D%0A%0D%0ASincerely,%0D%0AMusician`

       window.location.href = `mailto:${email}?subject=I Am Interested In Your Posting on BandMate!&body=${body_text}`;
    }

  render() {
    const { activeIndex } = this.state
    const listings = this.props.listings

    return (
      <Accordion styled>

        {listings.map((listing, index) => {
          return (
          <React.Fragment>
             <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                <Icon name='dropdown' />
               {listing.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <section>
                <p>{`Host:   ${listing.band? listing.band.name: 'no band'}`} </p>
                <p>{`Instruments:   ${listing.instruments}`} </p>
                <p>{`Description:   ${listing.description}`} </p>
                <button onClick={()=>{this.handleContact(listing)}} class="ui primary basic button">Contact</button>
                {/* <button onClick={()=>{this.handleUpdate(listing)}} class="ui pink basic button">Edit Listing</button> */}
        
                </section>
              </Accordion.Content>
          </React.Fragment>
        )})}
       
      </Accordion>
    )
  }
}