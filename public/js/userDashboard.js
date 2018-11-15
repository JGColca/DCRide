let requestButton = document.getElementById('requestButton')
let requestContainer = document.getElementById('locations')
let form = document.getElementById('form')
let backgroundDiv = document.getElementById('requestContainer')
let mapDiv = document.getElementById('mapAdmin')

form.style.display = 'none'
function updateUI() {

  let template = `
<<<<<<< HEAD
  <input type="radio" name='pickupLocation' id="manualLocation" onchange="test()"/>
  <label for="manualLocation">Enter your pickup address:<input id="locationTextBox" type="text" onfocus="initialize()" name="pickupLocation" /></label> <br/>
  <input type="radio" id="currentLocation" name='pickupLocation' onchange="test()"/>
  <label for="currentLocation">Use my current location as pickup location</label>
  <label>Enter your destination</label><input id="destination" type="text" onfocus="initialize()" name="destination"/>
  <input type='hidden' id="currentLatLngHiddenField" name='currentLatLng' />
  `
  form.insertAdjacentHTML('beforeend',template)
=======
  <div class="form-group">
  <input type="radio" name='pickupLocation' id="manualLocation" onchange="test()"/>
  <label for="manualLocation">Enter your pickup address:</label>
      <input name="pickupLocation" type="text" class="form-control" placeholder="Enter your pickup location" id="locationTextBox" onfocus="initialize()">
  </div>
  <div class="form-group">
  <input class="form-control" placeholder="Enter your destination" id="destination" type="text" onfocus="initialize()" name="destination"/>
  <input type='hidden' id="currentLatLngHiddenField" name='currentLatLng'/>
    </div>
    <input type="hidden" name="latlngPickupLocation" id="latlngPickupLocation"/>
  <div class="form-group">
  <input type="hidden" name="latlngDestination" id="latlngDestination"/>
<div class="form-group">
  <input type="radio"  id="currentLocation" name='pickupLocation' onchange="test()"/>
  <label for="currentLocation">Use my current location as pickup location</label>

  </div>

  `
  form.insertAdjacentHTML('beforeend',template)
  form.style.display = 'block'
>>>>>>> f63552f7beedf2c77277e83ede8f8e698565b5a3
  requestButton.style.display ='none'
let manualLocation=document.getElementById('manualLocation')
let currentLocation= document.getElementById('currentLocation')
let locationTextBox = document.getElementById('locationTextBox')

}

function test(){

  if(manualLocation.checked){
<<<<<<< HEAD
    locationTextBox.style.backgroundColor = 'white'
=======
locationTextBox.style.backgroundColor = 'white'
>>>>>>> f63552f7beedf2c77277e83ede8f8e698565b5a3
    locationTextBox.disabled = false
  } else {
    locationTextBox.disabled = true
    locationTextBox.style.backgroundColor = '#d9d9d9'
<<<<<<< HEAD
=======
    locationTextBox.value = ''
>>>>>>> f63552f7beedf2c77277e83ede8f8e698565b5a3
  }
}




requestButton.addEventListener('click',function(){

updateUI()

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
    let latlngPickupLocation = document.getElementById('latlngPickupLocation')
    latlngPickupLocation.value = ''
    latlngPickupLocation.value =`${place.geometry.location.lat()},${place.geometry.location.lng()}`

    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())
  })
  google.maps.event.addListener(autocomplete2,'place_changed',function(){
    var place2 = autocomplete2.getPlace();
    let latlngDestination = document.getElementById('latlngDestination')
    latlngDestination.value = ''
    latlngDestination.value = `${place2.geometry.location.lat()},${place2.geometry.location.lng()}`
    let submitButton = `
     <div class="form-group">
     <input type="submit" class="btn btn-default" onclick="requestRideButtonClick(event)"/>
     </div>

    `
    form.insertAdjacentHTML('beforeend',submitButton)

    console.log(place2.geometry.location.lat())
    console.log(place2.geometry.location.lng())
  })

};

<<<<<<< HEAD
form.addEventListener('submit', function(e){

  e.preventDefault()
=======
function requestRideButtonClick(event) {

  event.preventDefault()
>>>>>>> f63552f7beedf2c77277e83ede8f8e698565b5a3

  let useCurrentLocationRadioButton =  document.getElementById("currentLocation")


  if(useCurrentLocationRadioButton.checked) {

    currentLocation(function(coordinates){

        let currentLatLngHiddenField = document.getElementById("currentLatLngHiddenField")
        currentLatLngHiddenField.value = `${coordinates.latitude},${coordinates.longitude}`

<<<<<<< HEAD
        // got lat long from .value off of the form input, comes back as a string, separated by comma
        // below code breaks string at comma into a tuple, then we take values at position 0 and 1 of tupple and convert them
        // from string, back to float
        var latLongString = currentLatLngHiddenField.value
        var latLongTuple = latLongString.split(',')
        var lat = latLongTuple[0]
        var long = latLongTuple[1]

        console.log('lat: ', lat, 'long: ', long)
        form.className = "hide"
        backgroundDiv.className = "hide"

        mapDiv.className = "mapContainer"
        startMap(lat, long)




    })

  }


})

// function requestRideButtonClick(event) {
//
//   event.preventDefault()
//
//   let useCurrentLocationRadioButton =  document.getElementById("currentLocation")
//
//
//   if(useCurrentLocationRadioButton.checked) {
//
//     currentLocation(function(coordinates){
//
//         let currentLatLngHiddenField = document.getElementById("currentLatLngHiddenField")
//         currentLatLngHiddenField.value = `${coordinates.latitude},${coordinates.longitude}`
//
//         form.submit()
//     })
//
//   }
//
//
// }
=======
        form.submit()
    })

  } else {
    form.submit()
  }


}
>>>>>>> f63552f7beedf2c77277e83ede8f8e698565b5a3

//getting current location of user
function currentLocation(completion){
  var options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };

  function success(pos) {
    locationInfo=[]
    var crd = pos.coords;


    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

completion(crd)

  }

  function showError(error) {
     switch(error.code) {
         case error.PERMISSION_DENIED:
             alert("User denied the request for Geolocation.")
             break;
         case error.POSITION_UNAVAILABLE:
             alert("Location information is unavailable.")
             break;
         case error.TIMEOUT:
             alert("The request to get user location timed out.")
             break;
         case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
             break;
     }
  }


navigator.geolocation.getCurrentPosition(success, showError, options)
};
//------------------------------------------------------------
