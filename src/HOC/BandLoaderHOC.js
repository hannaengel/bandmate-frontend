import React from 'react'

const BandLoaderHOC = WrappedComponent => {
   return class BandLoaderHOC extends React.Component{

    isLoading = () => {
        return (this.props.current_user)
    }
       render(){
           return(!this.isLoading()?<h2>Loading...</h2>:<WrappedComponent {...this.props}/>)
       }
   }
}

export default BandLoaderHOC