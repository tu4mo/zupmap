require('dotenv').config({ silent: true })

const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
