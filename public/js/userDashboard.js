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
