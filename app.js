var express = require('express')

var app = express()

var bodyParser = require('body-parser')

var mongoose = require('mongoose')

var path = require('path')

var methodOverride = require('method-override')

var passport = require('passport')

var session = require('session')

var flash = require('flash')

app.locals.moment = require('moment')

var postRoutes = require('./routes/posts')

var userRoutes = require('./routes/users')

// APP CONFIG
// ============================================================
mongoose.connect('mongodb://heroku_blcpvb4p:5eokppmqjl1n3vnsoq5a9d0qr9@ds117816.mlab.com:17816/heroku_blcpvb4p', { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/semantic/dist')))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use('/uploads', express.static('uploads'))

// APP ROUTES
// ============================================================
app.get('/', function (req, res) {
  res.render('index')
})

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

// LISTEN
// ============================================================

app.listen(/* process.env.PORT */ 5000, process.env.IP, function () {
  console.log('Listening on port:' + '5000')
})
