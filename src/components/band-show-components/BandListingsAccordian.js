import React, { Component } from 'react'
import { Accordion, Icon, Button, Form } from 'semantic-ui-react'

export default class BandListingsAccordian extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      listings: this.props.listings
    };
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }


  handleChange = (activeIndex, event) => {
    console.log(activeIndex)
    console.log(event)
    let name = event.target.name
    let value = event.target.value
    this.setState(prevState => ({
        listings: {...this.state.listings, 
          [activeIndex]: {...this.state.listings[activeIndex], [name]: value}}
    }), ()=> console.log(this.state))
}

  handleContact = listing => {
    console.log('contact')
      console.log(listing)
       let email = listing.band.email
       let body_text = `Hello ${listing.band.name},%0D%0A%0D%0ASincerely,%0D%0AMusician`

       window.location.href = `mailto:${email}?subject=I Am Interested In Your Posting on BandMate!&body=${body_text}`;
    }

    handleDelete = listing => {
      this.props.onDelete(listing)
      const element = document.getElementById(listing.id)
      element.parentNode.removeChild(element);
    }
 

      updateListing = (e, listing)  =>{
        e.preventDefault();
        const id = listing.id
        const updateListing = this.state.listings[this.state.activeIndex]
        const url = `http://localhost:3000/api/v1/listings/${id}`
           fetch(url, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            listing: updateListing
            })
        })
      .then(res=>res.json())
      .then(json => {
        console.log('json should log here', json)
      })   
      // this.props.updateListings(this.state.listings)
    }

  render() {
    const { activeIndex } = this.state
    const listings = this.props.listings
    const band = this.props.band
    const editView = this.props.editView

    return (
      <React.Fragment>
      <Accordion styled>

        {listings.map((listing, index) => {
          return (
            editView == false? 
          <div id={listing.id}>
             <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                <Icon name='dropdown' />
                  {listing.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <section>
                  <p> {listing.band} </p>
                  <p>{`Instruments:   ${listing.instruments}`} </p>
                  <p>{`Description:   ${listing.description}`} </p>

                  {editView==false? 
                  <button onClick={()=>{this.handleContact(listing)}} class="ui primary basic button">Contact</button> :
                    <div>
                  <button className ='ui submit button' onClick={()=>{this.handleDelete(listing)}}> Delete </button>
                  </div>}
                </section>
              </Accordion.Content>
          </div>: 
                <Form id={listing.id}>
                <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                    {listing.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <section>
                  <Form.Field  onChange={(event)=>{this.handleChange(index, event)}}>
                    <label>Title</label>
                    <input name='title' placeholder={listing.title}/>
                 </Form.Field>
                 <Form.Field  onChange={(event)=>{this.handleChange(index, event)}}>
                    <label>Instruments</label>
                    <input name='instruments' placeholder={listing.instruments}/>
                 </Form.Field>
                 <Form.Field  onChange={(event)=>{this.handleChange(index, event)}}>
                    <label>Description</label>
                    <input name='description' placeholder={listing.description}/>
                 </Form.Field>
                  </section>
                </Accordion.Content>
                <Button onClick={() => {this.handleDelete(listing)}}>Delete</Button>
                <Button onClick={(e) => {this.updateListing(e,listing)}}>Commit Changes</Button>
                </Form>
        )})}
           </Accordion>
      
        </React.Fragment>
    )
  }
}