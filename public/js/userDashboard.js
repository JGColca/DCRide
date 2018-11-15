let requestButton = document.getElementById('requestButton')
let requestContainer = document.getElementById('locations')
let form = document.getElementById('form')


function updateUI() {

  let template = `
  <input type="radio" name='pickupLocation' id="manualLocation" onchange="test()"/>
  <label for="manualLocation">Enter your pickup address:<input id="locationTextBox" type="text" onfocus="initialize()" name="pickupLocation" /></label> <br/>
  <input type="radio" id="currentLocation" name='pickupLocation' onchange="test()"/>
  <label for="currentLocation">Use my current location as pickup location</label>
  <label>Enter your destination</label><input id="destination" type="text" onfocus="initialize()" name="destination"/>
  <input type='hidden' id="currentLatLngHiddenField" name='currentLatLng' />
  `
  form.insertAdjacentHTML('beforeend',template)
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
    let getGeoLocation = `
     <input type="hidden" name="latlng1" value="${place.geometry.location.lat()},${place.geometry.location.lng()}"/>
    `
      form.insertAdjacentHTML('beforeend',getGeoLocation)
    // element.value = [place.geometry.location.lat(),place.geometry.location.lng()]
    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())
  })
  google.maps.event.addListener(autocomplete2,'place_changed',function(){
    var place2 = autocomplete2.getPlace();
    let getGeoLocation2 = `
     <input type="hidden" name="latlng2" value="${place2.geometry.location.lat()},${place2.geometry.location.lng()}"/>
     <input type="submit" onclick="requestRideButtonClick(event)"/>


    `
    form.insertAdjacentHTML('beforeend',getGeoLocation2)
    // element.value = [place.geometry.location.lat(),place.geometry.location.lng()]
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
//------------------------------------------------------------
