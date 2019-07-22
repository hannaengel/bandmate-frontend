import React, { Component } from 'react'
import InstrumentFilter from './InstrumentFilter'


export default class FilterContainer extends Component {

    render() {
        return( 
            <React.Fragment>
                <section>
                <div class="ui large vertical menu">

                    <a class="active teal item">
                        <h4 class="ui header">Filter</h4>
                    </a>

                    <div class="item">
                         <div class="ui input"><input type="text" placeholder="Search..." /></div>
                     </div>
                     
                    <InstrumentFilter />
                 </div>
                 </section>
             </React.Fragment>
        )
    }
}