let requestButton = document.getElementById('requestButton')
let requestContainer = document.getElementById('locations')
let form = document.getElementById('form')

form.style.display = 'none'
function updateUI() {

  let template = `
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
  requestButton.style.display ='none'
let manualLocation=document.getElementById('manualLocation')
let currentLocation= document.getElementById('currentLocation')
let locationTextBox = document.getElementById('locationTextBox')

}

function test(){

  if(manualLocation.checked){
locationTextBox.style.backgroundColor = 'white'
    locationTextBox.disabled = false
  } else {
    locationTextBox.disabled = true
    locationTextBox.style.backgroundColor = '#d9d9d9'
    locationTextBox.value = ''
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

function requestRideButtonClick(event) {

  event.preventDefault()

  let useCurrentLocationRadioButton =  document.getElementById("currentLocation")


  if(useCurrentLocationRadioButton.checked) {

    currentLocation(function(coordinates){

        let currentLatLngHiddenField = document.getElementById("currentLatLngHiddenField")
        currentLatLngHiddenField.value = `${coordinates.latitude},${coordinates.longitude}`

        form.submit()
    })

  } else {
    form.submit()
  }


}

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
//--------------------------Google map----------------------------------
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: -34.397,
			lng: 150.644
		},
		zoom: 8
	});
}
