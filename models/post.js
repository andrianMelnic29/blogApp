var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String
})

module.exports = mongoose.model('Post', postSchema)
