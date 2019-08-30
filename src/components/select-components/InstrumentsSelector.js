import React, { Component } from 'react'
//import other files here

export default class InstrumentSelector extends Component {

    constructor() {
        super();
        this.state = {
            instruments: []
        };
    }

    handleChange = e =>{
        const instrument = e.target.value
        if (instrument !== ''){
        this.setState(prevState => ({
            instruments: prevState.instruments.concat(instrument)
        }), ()=> this.props.updateInstruments(this.state.instruments))     
        }
    }

    removeInstrument = e =>{
        const editedArray = this.state.instruments.filter(i => i !== e.target.value)
        this.setState(prevState => ({
            instruments: editedArray
        }), ()=> this.props.updateInstruments(this.state.instruments))   
    }

    render() {
        return( 
            <div>
                            <select onChange={this.handleChange} multiple="" class="ui fluid dropdown">
                            <option value="">Select Instruments</option>
                            <option value="accordian">Accordian</option>
                            <option value="banjo">Banjo</option>
                            <option value="bass">Bass</option>
                            <option value="backup-vocals">Backup Vocals</option>
                            <option value="cello">Cello</option>
                            <option value="clarinet">Clarinet</option>
                            <option value="dj">DJ</option>
                            <option value="flute">Flute</option>
                            <option value="harp">Harp</option>
                            <option value="keyboard">Keyboard</option>
                            <option value="piano">Piano</option>
                            <option value="percussion">Percussion</option>
                            <option value="strings">Strings</option>
                            <option value="synths">Synths</option>
                            <option value="trombone">Trombone</option>
                            <option value="trumpet">Trumpet</option>
                            <option value="ukulele">Ukulele</option>
                            <option value="violin">Violin</option>
                            <option value="voice">Voice</option>
                            </select>
                            <div>
                            {this.state.instruments.map((instrument) => {
                                return <button className="small blue ui button" value={instrument} onClick={this.removeInstrument}><i class="delete icon"></i>{instrument}</button>
                             })}
                            </div>
            </div>
        )
    }
}