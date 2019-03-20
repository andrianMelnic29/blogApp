var express = require('express')

var router = express.Router()

var Post = require('../models/post')

// ________________Routes_________________

// GET
router.get('/', function (req, res) {
  Post.find({}, function (err, allPosts) {
    if (err) {
      console.log(err)
    } else {
      res.render('posts/index', { posts: allPosts, page: 'posts' })
    }
  })
})

// NEW
router.get('/new', function (req, res) {
  res.render('posts/new')
})

// CREATE
router.post('/', function (req, res) {
  var title = req.body.postTitle
  var body = req.body.postBody
  var image = req.body.postImage
  var newPost = { title: title, body: body, image: image }
  console.log(newPost)
  Post.create(newPost, function (err, createdPost) {
    if (err) {
      console.log(createdPost)
      console.log(err)
    } else {
      res.redirect('/posts')
    }
  })
})

// DESTROY
router.delete('/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/posts')
    }
  })
})

module.exports = router
