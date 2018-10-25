const express = require('express')
const app = express()
require('express-ws')(app)
const path = require('path')

const ipaddress = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

const randomize = require('randomatic')

app.use(express.static(path.join(__dirname)))
  .listen(port, ipaddress, () => console.log(`server listening on ${ipaddress}:${port}`))

// end of server setup

app.TimeoutUsers = {}
app.SystemRooms = {}
app.Rooms = {}
app.Users = {}
app.UsersRef = {}
let { TimeoutUsers, SystemRooms, Rooms, Users, UsersRef } = app

app.NewUser = ID => {
  Users[ID] = {}
  UsersRef[ID] = {}
}

app.DeleteUser = ID => {
  delete Users[ID]
  delete UsersRef[ID]
}

app.defaultAvatar = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCACgAKADASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBAIH/8QAKhABAAIBAgQFAwUAAAAAAAAAAAECAxESBCExUhRRcYGREyIzMkFCYbH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABE2rXrMR6yCREWrbpMT6SkAAAAAAAAAAAAAAAFXEW249I6yCvLnmZ0pyjz83NcGS3OdI9XfDU5b59mgGS2DJXnGk+jrFnmJ0vzjz8mln4mnLfHuDQKuHtux6T1haAAAAAAAAAAAAAz8V/H3aFeam/Hy6xzAwfhqsZcGSKztt0n92oBXn/DZYy58kWnbXpH7g64X+Xs0K8NNmPn1nmsAAAAAAAAAAAAAVZM8UnSvOU577Kcus9FOHFv+63T/QVzre0zpznyh1X6tf0xaPZriIiNIjSEgx2+rb9UWn2cxrS0TpzjzhuRMRMaTGsArx54vOluUrWXNi2fdXp/i7BffTn1jqCwAAAAAAAAAAAGbip++I/pdijTFXTyUcT+SPQrxE1rEbY5RoDUM3iZ7YPEz2wDSM3iZ7YPEz2wC7LGuK2vkp4WfvmP6RbiJtWY2xzjQ4b8k+gNQAAAAAAAAAAAImtZ61ifWEbKdlfh0A52U7K/Bsp2V+HQDnZTsr8GynZX4dAOdlOyvwmK1jpWI9ISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=`

console.DLog = (...msg) => {
  const d = new Date()
  const h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
  const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
  const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
  console.log(`[${h}:${m}:${s}] `, msg.join('\t'))
}

// end of global variable setup

app.ws('/', (socket, req) => {
  socket.setMaxListeners(0)
  socket.ID = randomize('Aa0', 32)
  app.NewUser(socket.ID)

  console.DLog('CONNECT', socket.ID)

  socket.on('close', () => {
    app.DeleteUser(socket.ID)
    console.DLog('DISCONNECT', socket.ID)
  })

  // communication
  require('./utils/server/communication')(app, socket)
  require('./utils/server/login')(app, socket)

  // language send
  socket.comm('connect_setup', {
    ID: socket.ID,
    lang: require('accept-language-parser').parse(req.headers['accept-language'])
  })
})
