const express = require('express')
const app = express()
require('express-ws')(app)
const path = require('path')

const ipaddress = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

const randomize = require('randomatic')

app.use(express.static(path.join(__dirname)))
  .listen(port, ipaddress, () => console.log(`server listening on ${ipaddress}:${port}`))

app.ws('/', (socket, req) => {
  socket.on('close', () => {
    console.log(`DISCONNECT ${socket.ID}`)
  })
  socket.on('close', () => {
    console.log(`dupa ${socket.ID}`)
  })

  socket.comm = (message = '', data = '') => {
    if (typeof (message) === 'string') {
      socket.send(JSON.stringify({ message, data }))
    }
  }

  socket.receive = (message, callback) => {
    if (typeof (message) === 'string' && typeof (callback) === 'function') {
      socket.on('message', function (connection) {
        try {
          var data = JSON.parse(connection)
        } catch (e) {
          Error('error inside receive function')
          return
        }
        if (data.message === message) {
          callback(data.data)
        }
      })
    }
  }

  // language send
  socket.comm('setup_languageSet', require('accept-language-parser').parse(req.headers['accept-language']))

  socket.setMaxListeners(0)
  socket.ID = randomize('Aa0', 32)
  console.log(`CONNECT ${socket.ID}`)
})
