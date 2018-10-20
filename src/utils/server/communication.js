module.exports = socket => {
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
      })
    }
  }
}
