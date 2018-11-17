var map;

let carIdHiddenField = document.getElementById("carIdHiddenField").value
let closestCarLatHiddenField = parseFloat(document.getElementById("closestCarLatHiddenField").value)
let closestCarLngHiddenField = parseFloat(document.getElementById("closestCarLngHiddenField").value)
let pickupLocationLatHiddenField = parseFloat(document.getElementById("pickupLocationLatHiddenField").value)
let pickupLocationLngHiddenField = parseFloat(document.getElementById("pickupLocationLngHiddenField").value)
let currentLocationLatHiddenField = parseFloat(document.getElementById("currentLocationLatHiddenField").value)
let currentLocationLngHiddenField = parseFloat(document.getElementById("currentLocationLngHiddenField").value)
let destinationLatHiddenField = parseFloat(document.getElementById("destinationLatHiddenField").value)
let destinationLngHiddenField = parseFloat(document.getElementById("destinationLngHiddenField").value)

console.log(pickupLocationLatHiddenField)



// function initMap() {
// 	map = new google.maps.Map(document.getElementById('map'), {
// 		center: {
// 			lat: -34.397,
// 			lng: 150.644
// 		},
// 		zoom: 8
// 	});
// }
function initMap() {

	var yourLocation = {
		info: '<strong>Your Location</strong>',
		lat: pickupLocationLatHiddenField || currentLocationLatHiddenField,
		long: pickupLocationLngHiddenField || currentLocationLngHiddenField
	};

	var destination = {
		info: '<strong>Your Destination</strong>',
		lat: destinationLatHiddenField,
		long: destinationLngHiddenField
	};

	var carLocation = {
		info: '<strong>Car Location</strong>',
		lat: closestCarLatHiddenField,
		long: closestCarLngHiddenField
	};

	var locations = [
      [yourLocation.info, yourLocation.lat, yourLocation.long, 0],
      [destination.info, destination.lat, destination.long, 1],
      [carLocation.info, carLocation.lat, carLocation.long, 2],
    ];

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: new google.maps.LatLng(pickupLocationLatHiddenField || currentLocationLatHiddenField, pickupLocationLngHiddenField || currentLocationLngHiddenField),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
  var bounds = new google.maps.LatLngBounds;
       var markersArray = [];

       var  destinationA= {lat: closestCarLatHiddenField, lng: closestCarLngHiddenField};
       var origin1 = {lat: pickupLocationLatHiddenField || currentLocationLatHiddenField, lng: pickupLocationLngHiddenField || currentLocationLngHiddenField};
       var destinationB = {lat: destinationLatHiddenField, lng: destinationLngHiddenField};
       var destinationIcon = 'https://chart.googleapis.com/chart?' +
                   'chst=d_map_pin_letter&chld=D|FF0000|000000';
               var originIcon = 'https://chart.googleapis.com/chart?' +
                   'chst=d_map_pin_letter&chld=O|FFFF00|000000';
var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            // var showGeocodedAddressOnMap = function(asDestination) {
            //   var icon = asDestination ? destinationIcon : originIcon;
            //   return function(results, status) {
            //     if (status === 'OK') {
            //       map.fitBounds(bounds.extend(results[0].geometry.location));
            //       markersArray.push(new google.maps.Marker({
            //         map: map,
            //         position: results[0].geometry.location,
            //         icon: icon
            //       }));
            //     } else {
            //       alert('Geocode was not successful due to: ' + status);
            //     }
            //   };
            // };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              console.log(response.rows[0].elements)
              geocoder.geocode({'address': originList[i]},
                  );
              for (var j = 0; j < 1; j++) {
                geocoder.geocode({'address': destinationList[j]},
                  );
                    // outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    //     ': ' + results[j].distance.text + ' in ' +
                    //     results[j].duration.text + '<br>';
                    let totalDistance = ((results[0].distance.value + results[1].distance.value)/1000).toPrecision(4)
                    let totalTimeValue = (results[0].duration.value + results[1].duration.value)/3600
                    let totalDuration = ((totalTimeValue-Math.trunc(totalTimeValue))*60+(Math.trunc(totalTimeValue)*60)).toPrecision(4)
                    let totalCost = (5 + (2*totalDistance)).toPrecision(4)
    let tripInfo= `<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
      <div class="card-header">DURATION OF PICK UP</div>
      <div class="card-body">
        <p class="card-title">${destinationList[0]}<br/><b><u>to </u></b> <br/>${originList[0]}<p> <hr/>
        <p class="card-text">${results[0].distance.text} in ${results[0].duration.text }</h3></p>
      </div>
      </div>
      <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
  <div class="card-header">DURATION OF DROP-OFF</div>
  <div class="card-body">
    <p class="card-text">${originList[0]} <br/><b><u>to</u> </b> <br/>${destinationList[1]}</p><hr/>
    <p class="card-title">${results[1].distance.text} in ${results[1].duration.text }</p>
  </div>
</div>
<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
  <div class="card-header">WHOLE TRIP INFO</div>
  <div class="card-body">
    <h5 class="card-title">Estimated total distance /Estimated total duration</h5>
    <p class="card-text">${totalDistance} km /${totalDuration} mins</p>
  </div>
</div>
<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
  <div class="card-header">TOTAL TRIP COST</div>
  <div class="card-body">
    <h5 class="card-title">Estimated total cost</h5>
    <p class="card-text">$${totalCost}</p>
  </div>
</div>`

                // outputDiv.insertAdjacentHTML('beforeend',`<h3>Car Location(${destinationList[0]}) to Your Location(${originList[0]})(Duration of pickup): ${results[0].distance.text} in ${results[0].duration.text }</h3>`)
                //   outputDiv.insertAdjacentHTML('beforeend',`<h3>Your Location(${originList[0]}) to Your Destination(${destinationList[1]}): ${results[1].distance.text} in ${results[1].duration.text }</h3>`)
                  // let totalDistance = ((results[0].distance.value + results[1].distance.value)/1000).toPrecision(4)
                  // let totalTimeValue = (results[0].duration.value + results[1].duration.value)/3600
                  // let totalDuration = ((totalTimeValue-Math.trunc(totalTimeValue))*60+(Math.trunc(totalTimeValue)*60)).toPrecision(4)
                  // outputDiv.insertAdjacentHTML('beforeend',`<h2>Estimated total distance of trip: ${totalDistance} km</h2><h2>Estimated Total Trip Duration: ${totalDuration} mins</h2>`)
                  // console.log(results)
                  // let totalCost = (5 + (2*totalDistance)).toPrecision(4)
                  // outputDiv.insertAdjacentHTML('beforeend',`<h2>Estimated total cost: $${totalCost}</h2>`)
                  outputDiv.insertAdjacentHTML('beforeend',tripInfo)
                  outputDiv.insertAdjacentHTML('beforeend',`
                     <form id="databaseForm" action="/allValues" method="POST">
                     <input type="hidden" name="carLocation" value="${closestCarLatHiddenField},${closestCarLngHiddenField}"/>
                     <input type="hidden" name="pickupLocation" value="${pickupLocationLatHiddenField},${pickupLocationLngHiddenField}"/>

                     <input type="hidden" name="currentLocation" value="${currentLocationLatHiddenField},${currentLocationLngHiddenField}"/>
                     <input type="hidden" name="destination" value="${destinationLatHiddenField},${destinationLngHiddenField}"/>
                     <input type="hidden" name="tripDuration" value="${totalDuration} mins"/>
                     <input type="hidden" name="pickupDuration" value="${results[0].duration.text}"/>
                     <input type="hidden" name="cost" value="${totalCost}"/>
                     <input type="hidden" name="carid" value="${carIdHiddenField}"/>

                     </form>
                  `
                )

  document.getElementById('databaseForm').submit()

              }
            }
          }
        });


      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }
}
