const mongoose = require('mongoose')
const validate = require('validator')

const artifactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  history: String,
  era: String,
  origin: String,
  age: Number,
  images:[String]
}, {
  timestamps: true
})

const artifact = mongoose.model('artifact', artifactSchema)

module.exports = artifact