let car1 = {
    carID: "1",
    carLat: 29.669025,
    carLong: -95.196819,
    markerColor: "blue"
}

let car2 = {
    carID: "2",
    carLat: 29.757125,
    carLong: -95.355622,
    markerColor: "red"
}

let car3 = {
    carID: "3",
    carLat: 29.684545,
    carLong: -95.411491,
    markerColor: "yellow"
}

let car4 = {
    carID: "4",
    carLat: 29.752721,
    carLong: -95.339295,
    markerColor: "green" 
}

let car5 = {
    carID: "5",
    carLat: 29.646427,
    carLong: - 95.277743,
    markerColor: "orange" 
}

let car6 = {
    carID: "6",
    carLat: 29.844174,
    carLong: -95.234162,
    markerColor: "purple"
}

let car7 = {
    carID: "7",
    carLat: 29.835209,
    carLong: -95.412286,
    markerColor: "dark gray"
} 

let car8 = {
    carID: "8",
    carLat: 29.789602,
    carLong: -95.230839,
    markerColor: "magenta"
}

let car9 = {
    carID: "9",
    carLat: 29.650140,
    carLong: -95.419282,
    markerColor: "pink"
}

let car10 = {
    carID: "10",
    carLat: 29.759415,
    carLong: -95.448185,
    markerColor: "black"
}

let operatorRN
let changeAmountRN
let changeType

let cars = [car1,car2,car3,car4,car5,car6,car7,car8,car9,car10]

mapboxgl.accessToken = 'pk.eyJ1Ijoiamdjb2xjYSIsImEiOiJjam9hNHludmQxbnMyM3BwYm15M3l5N29hIn0.V6DSv7_Mml9d_n8O3WUmWw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-95.355622, 29.757125], // starting position
    zoom: 10 // starting zoom
})

map.addControl(new mapboxgl.NavigationControl());

for (index = 0; index < cars.length; index ++) {
    let currentCar = cars[index]
    setInterval(function(){
    change(currentCar)
    console.log("Car " + currentCar.carID + " : " + currentCar.carLat + "," + currentCar.carLong)}, 1000)
    
    function pointOnCircle(angle) {
        return {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [currentCar.carLong, currentCar.carLat]
                },
                "properties": {
                    "title": currentCar.carID,
                    'marker-color': '#3bb2d0',
                    'marker-size': 'large',
                    'marker-symbol': 'rocket'
                }
            }]
    }
    }
    map.on('load', function () {
        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource(('point' + currentCar.carID), {
            "type": "geojson",
            "data": pointOnCircle(0)
        });

        map.addLayer({
            "id": currentCar.carID,
            "source": ("point" + currentCar.carID),
            "type": "symbol",
            "marker-symbol": currentCar.carID,
            "layout": {
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        })


    function animateMarker(timestamp) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        map.getSource('point' + currentCar.carID).setData(pointOnCircle(timestamp / 1000));

        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
    }

    // Start the animation.
    animateMarker(0);
})
}
function whatChanges(){
  let changeRN = Math.floor((Math.random()* 3))
  //console.log(changeRN)
  let changeArray = ["latOnly", "longOnly", "both"]
  changeType = changeArray[changeRN]

}


function howMuchChange(){
    
        operatorRN = Math.floor((Math.random() * 2))
        changeAmountRN = Math.random() * (0.0014 - 0.0006) + 0.0006
        
}

function latChange (currentCar) {
    howMuchChange()
    if (operatorRN == 0) {
        currentCar.carLat += changeAmountRN
    } else {
        currentCar.carLat -= changeAmountRN
    }
    return currentCar.carLat
}

function longChange(currentCar) {
    howMuchChange()
    if (operatorRN == 0) {
        currentCar.carLong += changeAmountRN
    } else {
        currentCar.carLong -= changeAmountRN
    }
    return currentCar.carLong
}

function change(currentCar){
        whatChanges()
        if (changeType == "latOnly"){
            latChange(currentCar)
        }
        else if (changeType == "longOnly") {
            longChange(currentCar)
    }
        else if (changeType == "both"){
            latChange(currentCar)
            longChange(currentCar)
        }
        
    }



 

    