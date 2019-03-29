var express = require('express')

var router = express.Router()

var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
var upload = multer({ storage: storage, fileFilter: fileFilter })

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
router.post('/text', function (req, res) {
  var title = req.body.postTitle
  var body = req.body.postBody
  var newPost = { title: title, body: body }
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

router.post('/upload/image', upload.single('image'), function (req, res) {
  var image = req.file.path
  var title = req.body.postTitle
  var body = req.body.postBody
  var newPost = { title: title, body: body, image: image }
  Post.create(newPost, function (err, createdPost) {
    if (err) {
      console.log('Something went wrong ooooops: ' + err)
    } else {
      res.redirect('/posts')
    }
  })
})
router.post('/url/image', function (req, res) {
  var image = req.body.image
  var title = req.body.postTitle
  var body = req.body.postBody
  var newPost = { title: title, body: body, image: image }
  Post.create(newPost, function (err, createdPost) {
    if (err) {
      console.log('Something went wrong ooooops: ' + err)
    } else {
      res.redirect('/posts')
    }
  })
})

// EDIT
router.get('/:post_id/edit', function (req, res) {
  Post.findById(req.params.post_id, function (err, editPost) {
    if (err) {
      console.log(err)
    } else {
      console.log(editPost)
      res.render('posts/edit', { post: editPost })
    }
  })
})

// UPDATE
router.put('/:post_id', function (req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body.post,
    function (err, editedPost) {
      if (err) {
        console.log(err)
        res.redirect('/posts')
      } else {
        res.redirect('/posts')
      }
    })
})
// DESTROY
router.delete('/:post_id', function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/posts')
    }
  })
})

module.exports = router
