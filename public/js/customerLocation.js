var map;

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
		lat: 41.976816,
		long: -87.659916
	};

	var destination = {
		info: '<strong>Your Destination</strong>',
		lat: 41.939670,
		long: -87.655167
	};

	var carLocation = {
		info: '<strong>Car Location</strong>',
		lat: 42.002707,
		long: -87.661236
	};

	var locations = [
      [yourLocation.info, yourLocation.lat, yourLocation.long, 0],
      [destination.info, destination.lat, destination.long, 1],
      [carLocation.info, carLocation.lat, carLocation.long, 2],
    ];

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: new google.maps.LatLng(41.976816, -87.659916),
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

       var origin1 = {lat: 42.002707, lng: -87.661236};
       var destinationA = {lat: 41.976816, lng: -87.659916};
       var destinationB = {lat: 41.939670, lng: -87.655167};
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
              geocoder.geocode({'address': originList[i]},
                  );
              for (var j = 0; j < 1; j++) {
                geocoder.geocode({'address': destinationList[j]},
                  );
                    // outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    //     ': ' + results[j].distance.text + ' in ' +
                    //     results[j].duration.text + '<br>';

                outputDiv.insertAdjacentHTML('beforeend',`<h2>Car Location to Your Location(Duration of pickup): ${results[0].distance.text} in ${results[0].duration.text }</h2>`)
                  outputDiv.insertAdjacentHTML('beforeend',`<h2>Total Duration to Your Destination: ${results[1].distance.text} in ${results[1].duration.text }</h2>`)
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
