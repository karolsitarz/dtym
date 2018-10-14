module.exports = socket => {
  // add a send event
  socket.comm = function (message = '', data = '') {
    this.send(JSON.stringify({ message, data }))
    // add outgoing colored console log
    if (window.localStorage.getItem('DTYM_Debug') === 'true') {
      console.log(`%c→ ${message}`, 'color: #2C7C26;')
    }
  }

  // add a receive listener
  socket.receive = function (message, callback) {
    if (typeof (message) === 'string' && typeof (callback) === 'function') {
      socket.addEventListener('message', (connection) => {
        try {
          var data = JSON.parse(connection.data)
        } catch (e) {
          return
        }
        if (data.message === message) {
          callback(data.data)
        }
      })
    }
  }

  // add incoming colored console log
  socket.addEventListener('message', (connection) => {
    try {
      var data = JSON.parse(connection.data)
    } catch (e) {
      return
    }
    if (window.localStorage.getItem('DTYM_Debug') === 'true') {
      console.log(`%c← ${data.message}`, 'color: #7C2626;text-align: right; margin-left: auto')
    }
  })
}
