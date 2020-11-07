import React, { Component } from 'react';

class Map extends Component {


   // initMap = () => {
   //     let long_;
   //     let lat_;
   //     if(navigator.geolocation){
   //         navigator.geolocation.getCurrentPosition(position => {
   //             long_ = position.coords.longitude;
   //             lat_ = position.coords.latitude;
   //             console.log(lat_, long_);
   //         });
    
   //     }
   // }
    

    state = {  }
    render() { 
        return ( 
            <div id="map">
                

            </div>
         );
    }


componentDidMount(){
    let options = {
        zoom: 8,
        center: {lat: 40.726871821964394, lng: -73.86789317163431}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
}


}
 
export default Map;
