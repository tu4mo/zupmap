const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  message: { type: String, required: true },
  coordinates: { type: [Number], required: true, index: '2dsphere' },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema)
