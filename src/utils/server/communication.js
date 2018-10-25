module.exports = (app, socket) => {
  // send event
  socket.comm = (message = '', data = '') => {
    if (typeof (message) === 'string') {
      socket.send(JSON.stringify({ message, data }))
    }
  }

  // receive event
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
        console.log(`[DEBUG]  ${data.message}`)
      })
    }
  }

  // broadcast in room
  socket.commBroadcast = {
    room: roomName => {
      const currentSocketID = socket.ID
      if (roomName in app.rooms) {
        return {
          comm: (message = 'empty', data = '') => {
            if (typeof (message) === 'string') {
              for (let socketID in app.userRooms[roomName].players) {
                if (socketID !== currentSocketID) {
                  app.userRef[socket.ID].send(JSON.stringify({ message, data }))
                }
              }
            }
          }
        }
      }
    }
  }
}
