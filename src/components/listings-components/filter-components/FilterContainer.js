import React, { Component } from 'react'
import InstrumentFilter from './InstrumentFilter'


export default class FilterContainer extends Component {

    render() {
        const listings = this.props.listings
        return( 
            <React.Fragment>
                <div class="ui vertical menu">

                    <a class="active teal item">
                        <h4 class="ui header">Filter</h4>
                    </a>

                    <div class="item">
                         <div class="ui input"><input type="text" placeholder="Search..." /></div>
                     </div>
                     
                    <InstrumentFilter />
                 </div>
             </React.Fragment>
        )
    }
}