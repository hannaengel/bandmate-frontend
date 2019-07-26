import React from 'react'

const Spotify = props => {
    return (
        <div class="ui segment center-div-items">
        <div name='spotify' dangerouslySetInnerHTML={{ __html: props.spotify }} />
       </div>
    )
}

export default Spotify