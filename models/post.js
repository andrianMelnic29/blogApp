var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  likes:{
    type: Number,
    default: 0
  },
  date: Date
})

module.exports = mongoose.model('Post', postSchema)
