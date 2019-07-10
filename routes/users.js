var express = require('express')

var router = express.Router()

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.get('/signup', function (req, res) {
  res.render('users/signup')
})
module.exports = router
