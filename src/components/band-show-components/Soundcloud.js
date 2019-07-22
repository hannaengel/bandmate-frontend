import React from 'react'

const Soundcloud = props => {
    return (
        <div class="ui segment">
        <div name='soundcloud' dangerouslySetInnerHTML={{ __html: props.soundcloud }} />
        </div>)
}

export default Soundcloud