function startMap(lat, long){

  console.log(lat, long, 'got lat and long of user for map', lat, long)

  var socket = io()
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
  let marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10
  let operatorRN
  let changeAmountRN
  let changeType

  let cars = [car1,car2,car3,car4,car5,car6,car7,car8,car9,car10]
  let markers = [marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9,marker10]

  var map;







  function initMap() {
      map = new google.maps.Map(document.getElementById('mapAdmin'), {
          center: { lat: 29.757125 , lng: -95.355622 },
          zoom: 10,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true
      })
  }

  initMap()
  createMarkers()
  sendCarInfo()

  setInterval(function(){
  createCarInfo()}, 1000)

  setInterval(function () {
      sendCarInfo()
  }, 16000)

  function createCarInfo() {

      for (index = 0; index < cars.length; index++) {

          let currentCar = cars[index]
          let currentMarker = markers[index]

              driveCars(currentCar, currentMarker)

      }
  }

  function sendCarInfo() {


      let index = 0;

      let singleCar = setInterval(function () {
          if (index < cars.length) {
              let currentCar = cars[index]

              socket.emit('submitCarLocation', currentCar)
              index++
          } else {
              clearInterval(singleCar)
          }
      }, 1500)
  }

  function createMarkers() {
      for (index = 0; index < markers.length; index++) {
          var startPosition = { lng: cars[index].carLong, lat: cars[index].carLat }
          markers[index] = new SlidingMarker({
              position: startPosition,

              map: map,
              duration: 1000,
              easing: "linear"
          })
          markers[index].setDuration(1000)
          //console.log(markers[index])
          //console.log(cars[index].carLong)
  }
  }



  function driveCars(currentCar, currentMarker) {




          change(currentCar)
          //console.log("Car " + currentCar.carID + " : " + currentCar.carLat + "," + currentCar.carLong)

          var newPosition = { lng: currentCar.carLong, lat: currentCar.carLat}
          currentMarker.setPosition(newPosition)



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




  function postCars() {

      setInterval(function(){

          for (index = 0; index < cars.length; index ++){

          let car = cars[index]
          let carRow = (index + 1)

          var row = document.getElementById("carLocationTable").rows[carRow].cells


          row[0].innerHTML = "Car " + car.carID
          row[1].innerHTML = car.carLong
          row[2].innerHTML = car.carLat
      }
  },1000)
  }
  postCars()

}
