var express = require('express')

var app = express()

var bodyParser = require('body-parser')

var mongoose = require('mongoose')

var path = require('path')

var methodOverride = require('method-override')

app.locals.moment = require('moment')

// APP CONFIG
// ============================================================
mongoose.connect('mongodb://heroku_blcpvb4p:5eokppmqjl1n3vnsoq5a9d0qr9@ds117816.mlab.com:17816/heroku_blcpvb4p', { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')


// APP ROUTES
// ============================================================
app.get('/', function (req, res) {
    res.render('index')
})

// LISTEN
// ============================================================

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Listening on port:' + process.env.PORT)
})
