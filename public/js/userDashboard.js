let requestButton = document.getElementById('requestButton')
let requestContainer = document.getElementById('requestContainer')
let locationInfo=[]
currentLocation()
requestButton.addEventListener('click',function(){

let template = `
<form action="/customerLocation" method="POST">
<label>Enter your pickup address:</label>

<input id="locationTextBox" type="text" onfocus="initialize(this)" name="pickupLocation"/>
OR
<input type="radio" id="radio" name="pickupLocationRadio" value="${locationInfo[0].lat},${locationInfo[0].long}"/>
<label for="radio">Use the current location as pickup location</label>
<label>Enter your destination</label><input id="destination" type="text" onfocus="initialize(this)" name="destination"/>

<input type="submit"/>
</form>
`
requestContainer.innerHTML = template
// let currentLocationButton=document.getElementById('currentLocationButton')

// currentLocationButton.addEventListener('click',function(){
//   currentLocation()
//
// })

})
//--------Google Map-------------
//----required configuration--------------
function initMap() {
     directionsService = new google.maps.DirectionsService;
     directionsDisplay = new google.maps.DirectionsRenderer;
     geocoder = new google.maps.Geocoder();

   }
//------------------------------------------
   function initialize(element) {
     //getting autocomplete for inputtextbox1 and inputtextbox2
  var input = document.getElementById('locationTextBox');
  var input2 = document.getElementById('destination')
  var autocomplete1=new google.maps.places.Autocomplete(input);
  var autocomplete2=new google.maps.places.Autocomplete(input2);
  //converting those addresses to their geo locations
  google.maps.event.addListener(autocomplete1,'place_changed',function(){
    var place = autocomplete1.getPlace();
    element.value = [place.geometry.location.lat(),place.geometry.location.lng()]
    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())
  })
  google.maps.event.addListener(autocomplete2,'place_changed',function(){
    var place = autocomplete2.getPlace();
    element.value = [place.geometry.location.lat(),place.geometry.location.lng()]
    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())
  })

};

//getting current location of user
function currentLocation(){
  var options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };

  function success(pos) {
    locationInfo=[]
    var crd = pos.coords;
    locationInfo.push({lat:crd.latitude,long:crd.longitude})
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
navigator.geolocation.getCurrentPosition(success, error, options)
};
<<<<<<< HEAD
=======


// google.maps.event.addDomListener(window, 'load', initialize);
   // function initialize(){
   //     let locInput = document.getElementsByClassName("requestContainer")
   //     google.maps.places.Autocomplete(locInput)
   //   }

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 13
//   });
//   var card = document.getElementById('pac-card');
//   var input = document.getElementById('pac-input');
//   var types = document.getElementById('type-selector');
//   var strictBounds = document.getElementById('strict-bounds-selector');
//
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
//
//   var autocomplete = new google.maps.places.Autocomplete(input);
//
//   // Bind the map's bounds (viewport) property to the autocomplete object,
//   // so that the autocomplete requests use the current map bounds for the
//   // bounds option in the request.
//   autocomplete.bindTo('bounds', map);
//
//   // Set the data fields to return when the user selects a place.
//   autocomplete.setFields(
//       ['address_components', 'geometry', 'icon', 'name']);
//
//   var infowindow = new google.maps.InfoWindow();
//   var infowindowContent = document.getElementById('infowindow-content');
//   infowindow.setContent(infowindowContent);
//   var marker = new google.maps.Marker({
//     map: map,
//     anchorPoint: new google.maps.Point(0, -29)
//   });
//
//   autocomplete.addListener('place_changed', function() {
//     infowindow.close();
//     marker.setVisible(false);
//     var place = autocomplete.getPlace();
//     if (!place.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }
//
//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);  // Why 17? Because it looks good.
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//
//     var address = '';
//     if (place.address_components) {
//       address = [
//         (place.address_components[0] && place.address_components[0].short_name || ''),
//         (place.address_components[1] && place.address_components[1].short_name || ''),
//         (place.address_components[2] && place.address_components[2].short_name || '')
//       ].join(' ');
//     }
//
//     infowindowContent.children['place-icon'].src = place.icon;
//     infowindowContent.children['place-name'].textContent = place.name;
//     infowindowContent.children['place-address'].textContent = address;
//     infowindow.open(map, marker);
//   });
//
//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   function setupClickListener(id, types) {
//     var radioButton = document.getElementById(id);
//     radioButton.addEventListener('click', function() {
//       autocomplete.setTypes(types);
//     });
//   }
//
//   setupClickListener('changetype-all', []);
//   setupClickListener('changetype-address', ['address']);
//   setupClickListener('changetype-establishment', ['establishment']);
//   setupClickListener('changetype-geocode', ['geocode']);
//
//   document.getElementById('use-strict-bounds')
//       .addEventListener('click', function() {
//         console.log('Checkbox clicked! New state=' + this.checked);
//         autocomplete.setOptions({strictBounds: this.checked});
//       });
// }
>>>>>>> 5656b853d6eca027f3ac8c0e265d972a0c8e4ea0
