import React, { Component } from 'react'
import InstrumentFilter from './InstrumentFilter'


export default class FilterContainer extends Component {
    handleChange = e => {
        this.props.onFilter(e.target.value)
    }
    render() {
        return( 
            <React.Fragment>
                <section>
                <div class="ui large vertical menu">

                    <a class="active teal item">
                        <h4 class="ui header">Filter</h4>
                    </a>

                    <div class="item">
                         <div onChange={this.handleChange} class="ui input"><input type="text" placeholder="Search..." /></div>
                         
                     </div>
                     
                    <InstrumentFilter />
                 </div>
                 </section>
             </React.Fragment>
        )
    }
}