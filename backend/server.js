require('dotenv').config({ silent: true })

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI)

const Message = require('./models/Message')

app.get('/api/messages', (req, res) => {
  Message.where('coordinates').near({
    center: [req.query.long, req.query.lat],
    maxDistance: 1,
    spherical: true
  })
  .then(response => res.send(response))
  .catch(err => res.send(err.message))
})

app.post('/api/messages', (req, res) => {
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

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
