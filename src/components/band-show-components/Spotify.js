import React from 'react'

const Spotify = props => {
    return (
        <div class="ui segment">
        <div name='spotify' dangerouslySetInnerHTML={{ __html: props.spotify }} />
       </div>
    )
}

export default Spotify