const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Message = require('./models/Message')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

router.get('/api/messages', (req, res) => {
  Message.where('coordinates').near({
    center: [req.query.long, req.query.lat],
    maxDistance: 1,
    spherical: true
  })
  .then(results => {
    const messages = results.map(message => ({
      message: message.message,
      longitude: message.coordinates[0],
      latitude: message.coordinates[1]
    }))
    res.send(messages)
  })
  .catch(err => res.send(err.message))
})

router.post('/api/messages', (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    coordinates: [req.body.longitude, req.body.latitude]
  })

  newMessage.save()
  .then(message => {
    res.send(message)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

module.exports = router
