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

  render() {
    const { activeIndex } = this.state
    const listings = this.props.listings

    return (
      <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
         Listing 
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
           description
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Listing
         </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            description
          </p>
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Listing
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            description
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}