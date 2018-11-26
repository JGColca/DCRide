const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const app = express()
var session = require('express-session')
var cors = require('cors')

var closestCar = []

app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

var http = require('http').Server(app)
var io = require('socket.io')(http);

const models = require('./models')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))


app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false
}))

http.listen(3012,function(req,res){
  console.log('listening on *:3012')

})



let authenticateLogin = function(req,res,next) {


 if(req.session.username || req.session.adminname) {
   next()
 } else {
   res.redirect("/login")
 }

}
app.all("/dashboard/*",authenticateLogin,function(req,res,next){
   next()
})
app.all("/admin",authenticateLogin,function(req,res,next){
   next()
})
app.all("/cars/*",authenticateLogin,function(req,res,next){
   next()
})

app.get('/',function(req,res){

res.render('index',{username: req.session.username || req.session.adminname, isAdmin : req.session.adminname != null})
})
app.post('/register',function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
  let username = req.body.username
  let password = hash
  let email = req.body.email
  

  models.Users.findOne({

    where:{
      $or: [
        {
   email: email
 },
 {
   username: username
 }
]
    }
  }).then(function(user){
       if(user != null){
         res.render('Signup', {message : "This username/email is already taken.Please try to register with different credentials"})
       } else {
          models.Users.build({
           username:username,
           email:email,
           password:password
         }).save().then(function(){
           res.redirect('/login')

         })
       }
  })
})
})


app.get('/register',function(req,res){
  res.render('Signup')
})
app.get('/login',function(req,res){
  res.render('Login')
})

app.post('/login',function(req,res){
  let email = req.body.email
  let password = req.body.password
  models.Users.findOne({
    where:{
      email:email,
    }
  }).then(function(user){
    if(user!=null){
    bcrypt.compare(password, user.password, function (err, result) {
      if (result == true) {
    req.session.userid = user.id
    req.session.username = user.username
    res.redirect('/')
  }
})
    }
  else if (user == null){
    models.Admins.findOne({
      where:{
        email:email,
        
      }
    }).then(function(admin){
      if(admin!=null){
        bcrypt.compare(password, admin.password, function (err, result) {
          if (result == true) {
      req.session.adminid = admin.id
      req.session.adminname = admin.username
      res.redirect('/')
    } 
  })
}
  else {
  res.render('Login',{message: 'Invalid credentials, try again'})
  }

  })
} else{
  res.render('Login',{message: 'Invalid credentials, try again'})
}
}).catch(function(error){
  console.log(error)
})
})

app.get('/logout',function(req,res){
    req.session.destroy()
    res.redirect('/')
})
app.get('/dashboard/user',function(req,res){
  res.render('userDashboard',{username: req.session.username, userid : req.session.userid})

})
app.get('/dashboard/admin',function(req,res){
  res.redirect('/admin')

})

app.post('/customerLocation',function(req,res){
  let pickupGeoLocation = req.body.latlngPickupLocation
  let pickupGeoLocationArray =pickupGeoLocation.split(',')
  let pickupLocationLat = pickupGeoLocationArray[0]
  let pickupLocationLng = pickupGeoLocationArray[1]
  let destinationGeoLocation = req.body.latlngDestination
  let destinationGeoLocationArray = destinationGeoLocation.split(',')
  let DestinationLat  = destinationGeoLocationArray[0]
  let DestinationLng  = destinationGeoLocationArray[1]
  let currentGeoLocation = req.body.currentLatLng
  let currentGeoLocationArray = currentGeoLocation.split(',')
  let currentLat = currentGeoLocationArray[0]
  let currentLng = currentGeoLocationArray[1]
var distances = []

models.Cars.findAll().then(function(cars){
  distances =[]
  cars.forEach(function(car){
    if(pickupGeoLocation!=''){
    distances.push({carid: car.id,carLat:car.currentlat,carLng:car.currentlong, carDistance:distance(pickupLocationLat,pickupLocationLng, car.currentlat, car.currentlong)})
  } else {
    distances.push({carid: car.id, carLat:car.currentlat,carLng:car.currentlong, carDistance:distance(currentLat,currentLng, car.currentlat, car.currentlong)})

  }
  })
 
  let carDistances = distances.map(function(each){
    return each.carDistance
  })
let sortedCarDistances=carDistances.sort(function(a,b) { return a-b; })


 distances.forEach(function(each){

  if(sortedCarDistances[0] == each.carDistance){

    closestCar.push({id:each.carid, lat:each.carLat, lng:each.carLng})
  }
})



  let apiData = {carid:closestCar[0].id,closestCarLat:closestCar[0].lat,closestCarLng: closestCar[0].lng,pickupLocationLat:pickupLocationLat, pickupLocationLng:pickupLocationLng,currentLocationLat:currentLat,currentLocationLng:currentLng,destinationLat:DestinationLat,destinationLng:DestinationLng, username: req.session.username, userid:req.session.userid }


res.render("customerLocation", apiData)

})
  })


function deg2rad(deg) {
   return deg * Math.PI / 180
 }
 function distance(lat1, lon1, lat2, lon2) {
   var R = 6371; 
   var dLat = deg2rad(lat2 - lat1); 
   var dLon = deg2rad(lon2 - lon1);
   var a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
     Math.sin(dLon / 2) * Math.sin(dLon / 2);

   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c;
   return d;
 }





// app.get('/user/customerLocation',function(req,res){
//   res.render('customerLocation', {username: req.session.username})
// })

app.use('/admin', express.static('static'))
app.use('/admin', express.static('public'))

app.get('/admin', function (req, res) {
  res.render('carController', {username: req.session.adminname})
})

io.on('connection', function (socket) {
  socket.on('submitCarLocation', function (info) {
    models.Cars.update({
      currentlong: info.carLong,
      currentlat: info.carLat,
    }, {

        where: { id: info.carID }

      })
  })
})
app.post('/allValues',function(req,res){
  let carLocation = req.body.carLocation
  let pickupLocation = req.body.pickupLocation
  let currentLocation = req.body.currentLocation
  let destination = req.body.destination
  let tripDuration = req.body.tripDuration
  let pickupDuration = req.body.pickupDuration
  let cost = req.body.cost
  let carid = req.body.carid
  

if(pickupLocation == 'NaN,NaN'){
  models.Transactions.build({
    carstartlocation: carLocation,
    pickuplocation: currentLocation,
    dropofflocation: destination,
    pickupduration: pickupDuration,
    tripduration: tripDuration,
    cost:cost,
    userid: req.session.userid,
    carid: carid
  }).save().then(function(data){
        
  })
} else {
  models.Transactions.build({
    carstartlocation: carLocation,
    pickuplocation: pickupLocation,
    dropofflocation: destination,
    pickupduration: pickupDuration,
    tripduration: tripDuration,
    cost:cost,
    userid: req.session.userid,
    carid: carid
  }).save().then(function(data){
       
  })
}

})

app.get('/cars/:no',function(req,res){
  let carid = req.params.no
  models.Transactions.findAll({where:
  {
    carid : carid
  }}).then(function(transactions){
    
    res.render('carHistories',{transactions:transactions, username:req.session.adminname})
  })
})
