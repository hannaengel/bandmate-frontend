// import React, { Component } from 'react'
// import BandPhoto from './BandPhoto'

// export default class BandPhotoEdit extends Component {

//     constructor() {
//         super();
//         this.state = {
//             editMode: true
//         };
//     }


//     handleClick = event => {
//         console.log(event)
//     }
//     render() {
//         return( 
//             <React.Fragment>
//             {this.state.editMode?
//                 <BandPhoto image_url={this.props.image_url}/>
//                 <button className='ui green button' onClick={this.handleClick}> Edit Photo </button> 
//                 :
//                 <div> EDIT FORM </div>}
//                 </React.Fragment>
//         )
//     }
// }