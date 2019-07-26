import React from 'react'

const Soundcloud = props => {
    return (
        <div class="ui segment center-div-items">
        <div name='soundcloud' dangerouslySetInnerHTML={{ __html: props.soundcloud }} />
        </div>)
}

export default Soundcloud