import React from 'react'


const BandPhoto = props => {
    return (
    <div className="ui segment">
    <img  src={props.image_url} alt='NO IMAGE'/> 
     </div>
    )
}
export default BandPhoto