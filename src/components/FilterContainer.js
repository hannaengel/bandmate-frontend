import React, { Component } from 'react'
import InstrumentFilter from './filter-components/InstrumentFilter'

export default class FilterContainer extends Component {

//state here
    render() {
        return( 
            <div>
                <div class="ui vertical menu">

                    <a class="item">
                        <h4 class="ui header">Filter</h4>
                    </a>

                    <div class="item">
                         <div class="ui input"><input type="text" placeholder="Search..." /></div>
                     </div>
                     
                    <InstrumentFilter />
                 </div>
            </div>
        )
    }
}