var express = require('express')

var router = express.Router()

var moment = require('moment')

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
  var date = moment().format()
  var newPost = { title: title, body: body, date: date }
  Post.create(newPost, function (err, createdPost) {
    if (err) {
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
  var date = moment().format()
  var newPost = { title: title, body: body, image: image, date: date }
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
  var date = moment().format()
  var newPost = { title: title, body: body, image: image, date: date }
  Post.create(newPost, function (err, createdPost) {
    if (err) {
      console.log('Something went wrong ooooops: ' + err)
    } else {
      res.redirect('/posts')
    }
  })
})

// EDIT
router.get('/:id/edit', function (req, res) {
  Post.findById(req.params.id, function (err, editPost) {
    if (err) {
      console.log(err)
    } else {
      res.render('posts/edit', { post: editPost })
    }
  })
})
function createImagePost (img, title, body) {
  var post = { image: img, title: title, body: body }
  return post
}
function createPost (title, body) {
  var post = { title: title, body: body }
  return post
}
function checkImageInputs (imageURL, imageFile) {
  var status = false
  var data = null
  if (imageURL !== '') {
    console.log('imageURL: ' + imageURL)
    status = true
    data = imageURL
  } else if (imageFile !== undefined) {
    console.log('imageUpload: ' + imageFile.path)
    status = true
    data = imageFile.path
  }
  var response = {
    status: status,
    data: data
  }
  return response
}
// UPDATE
router.put('/:id', upload.single('imageUpload'), function (req, res) {
  var response = checkImageInputs(req.body.imageURL, req.file)
  console.log(response)
  var updatedPost
  if (response.status) {
    console.log('Image edited')
    updatedPost = createImagePost(response.data, req.body.postTitle, req.body.postBody)
    console.log(updatedPost)
  } else {
    console.log('Only text edited')
    updatedPost = createPost(req.body.postTitle, req.body.postBody)
  }
  Post.findOneAndUpdate({ _id: req.params.id }, updatedPost,
    function (err, editedPost) {
      if (err) {
        // console.log(err)
      } else {
        res.redirect('/posts')
      }
    })
})
// DESTROY
router.delete('/:id', function (req, res) {
  Post.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('deleted id:' + req.params.id)
      res.redirect('/posts')
    }
  })
})

// LIKES
router.post('/:id/like', function (req, res) {
  Post.findOneAndUpdate({ _id: req.params.id }, {
    $inc: { 'likes': 1 }
  }, { new: true },
  function (err, editedPost) {
    if (err) {
      console.log(err)
    } else {
      res.send(editedPost)
    }
  })
})
router.post('/:id/dislike', function (req, res) {
  Post.findOneAndUpdate({ _id: req.params.id }, {
    $inc: { 'likes': -1 }
  }, { new: true },
  function (err, editedPost) {
    if (err) {
      console.log(err)
    } else {
      res.send(editedPost)
    }
  })
})
module.exports = router
