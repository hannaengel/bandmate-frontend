import React, { Component } from 'react'


export default class GenresSelector extends Component {

    constructor() {
        super();
        this.state = {
            genres: []
        };
    }

    handleChange = e =>{
        const genre = e.target.value
        console.log(genre)
        if (genre !== ''){
        this.setState(prevState => ({
            genres: prevState.genres.concat(genre)
        }), ()=> this.props.updateGenres(this.state.genres))     
        }
    }

    removeGenre = e =>{
        const editedArray = this.state.genres.filter(i => i !== e.target.value)
        this.setState(prevState => ({
            genres: editedArray
        }), ()=> this.props.updateGenres(this.state.genres))   
    }

    render() {
        return( 
            <div>
                            <select onChange={this.handleChange} multiple="" class="ui dropdown">
                            <option value="">Select Genre</option>
                            <option value="acoustic">Acoustic</option>
                            <option value="bluegrass">Bluegrass</option>
                            <option value="classical">Classical</option>
                            <option value="country">Country</option>
                            <option value="electronic">Electronic</option>
                            <option value="folk">Folk</option>
                            <option value="fusion">Fusion</option>
                            <option value="gospel">Gospel</option> 
                            <option value="hardcore">Hardcore</option>
                            <option value="hip-hop">Hip-hop</option>
                            <option value="metal">Metal</option>
                            <option value="neo-soul">Neo-Soul</option>
                            <option value="pop">Pop</option> 
                            <option value="r&b">R&B</option>
                            <option value="rap">Rap</option>
                            <option value="rock">Rock</option>
                            <option value="soul">Soul</option>
                            <option value="jazz">Jazz</option>
                            </select>
                            <div>
                            {this.state.genres.map((genre) => {
                                return <button value={genre} onClick={this.removeGenre}>{genre}</button>
                             })}
                            </div>
            </div>
        )
    }
}