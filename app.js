//----------------configuration---------------------------
const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
var session = require('express-session')
// import the pg-promise library which is used to connect and execute SQL on a postgres database
const pgp = require('pg-promise')()
// connection string which is used to specify the location of the database
const connectionString = "postgres://frrnsews:EoJ-dl7OE23qas-6FFzmsPBBCs12F_bH@baasu.db.elephantsql.com:5432/frrnsews"
var pg = require('pg');
var http = require('http').Server(app)
var io = require('socket.io')(http);

var client = new pg.Client(connectionString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
// creating a new database object which will allow us to interact with the database
const db = pgp(connectionString)
const models = require('./models') //sequelize config
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
app.listen(3012,function(req,res){
  console.log('listening on *:3012');

});
//-----------------middleware-------------------------------------

// let authenticateLogin = function(req,res,next) {
//
//  // check if the user is authenticated
//  if(req.session.username) {
//    next()
//  } else {
//    res.redirect("/login")
//  }
//
// }
// app.all("/user/*",authenticateLogin,function(req,res,next){
//    next()
// })
//-------------------------------------------
app.get('/',function(req,res){
res.render('index',{username: req.session.username})
})
app.post('/register',function(req,res){
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  //------register validation by email, username---------------
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
      password:password
    }
  }).then(function(user){
    if(user!=null){
    req.session.userid = user.id
    req.session.username = user.username
    res.redirect('/')
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
app.get('/user/dashboard',function(req,res){
  res.render('userDashboard',{username: req.session.username})
})
app.post('/customerLocation',function(req,res){
  let latlng1 = req.body.latlng1
  let latlng2  = req.body.latlng2
  let currentLatLng = req.body.currentLatLng
  let userid = req.session.userid
  console.log(latlng1)
  console.log(latlng2)
  console.log(currentLatLng)


  // models.Transactions.build({
  //   pickuplocation:pickupLocation,
  //   dropofflocation:destination,
  //   userid:userid,
  //   carid:2
  // }).save().then(function(){
    // res.render('customerLocation')
res.redirect('/user/dashboard')
  })


app.use('/admin', express.static('static'))
app.use('/admin', express.static('public'))

app.get('/admin', function (req, res) {
  res.render('carController', { username: req.session.username })
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


app.get('/adminlogin', function (req, res) {
  res.render('adminlogin')
})

app.post('/adminlogin', function (req, res) {
  let email = req.body.email
  let password = req.body.password

models.Admins.findOne({
    where: {
      email: email,
      password: password
    }
  }).then(function (admin) {
    if (admin != null) {
      req.session.userid = admin.id
      req.session.username = admin.username
      res.redirect('/admin')
    } else {
      res.render('adminlogin', { message: 'Invalid credentials, try again' })
    }
  }).catch(function (error) {
    console.log(error)
  })
})
