
// Error Handeler
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
// displaying result on the map
function displayPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=
    "+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBoK1mDtgeh_BD_kVclDiPgjG8euDTigdE";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}
// updating users locations

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(userPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function userPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
// near by car

var temp_lat = '';
    var temp_lng = '';
    var map;
    var infowindow;
    getLocation();
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
            temp_lat = 0.0; //set default lat value
            temp_lng = 0.0; //set default lng value
    }
}

function showPosition(position) {
    temp_lat = position.coords.latitude;
    temp_lng = position.coords.longitude;
    initMap();
}


 function initMap()
 {
 var pyrmont = {lat: temp_lat, lng: temp_lng};
 map = new google.maps.Map(document.getElementById('map'),
 { center: pyrmont, zoom: 15 });
 infowindow = new google.maps.InfoWindow();
 var service = new google.maps.places.PlacesService(map);  service.nearbySearch(
 { location: pyrmont, radius: 500, type: ['school'] },
 callback); }
 function callback(results, status) {
 if (status === google.maps.places.PlacesServiceStatus.OK)
 {
 for (var i = 0; i < results.length; i++)
 { createMarker(results[i]); } } } function createMarker(place) { var placeLoc = place.geometry.location; var marker = new google.maps.Marker({ map: map, position: place.geometry.location }); google.maps.event.addListener(marker, 'click', function() { infowindow.setContent(place.name); infowindow.open(map, this); }); }

// showing the distance
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
// showing the distance

var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location : myPlace,
                radius : 5500,
                type : [ 'restaurant' ]
            }, callback);
            function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map : map,
                position : place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
