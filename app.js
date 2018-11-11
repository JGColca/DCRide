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
app.use(express.static('css'))
app.use(express.static('js'))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false
}))
app.listen(3012,function(req,res){
  console.log("Server has started...")
})
//------------------------------------------------------
//--------middleware------------------
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
// app.all("/",authenticateLogin,function(req,res,next){
//    next()
// })
//-------------------------------------------
app.get('/',function(req,res){
  if(req.session.userid){
    res.render('homepage',{username: req.session.username})
  } else{
    res.render('homepage')
  }

})
app.post('/register',function(req,res){
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  //------register validation by email, username????---------------
  models.Users.findOne({

    where:{
      email : email,

    }
  }).then(function(user){
       if(user != null){
         res.render('register', {message : "This username/password is already taken.Please try to register with different credentials"})
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
  res.render('register')
})
app.get('/login',function(req,res){
  res.render('login')
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
    res.render('login',{message: 'Invalid credentials,try again'})
  }
}).catch(function(error){
  console.log(error)
})
})
app.get('/logout',function(req,res){
    req.session.destroy()
    res.redirect('/')
})
