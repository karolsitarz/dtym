module.exports = socket => {
  // add the events object
  socket.Events = {};
  const { Events } = socket;

  // add the send event
  socket.comm = function (message = '', data = '') {
    this.send(JSON.stringify({ message, data }));
    // add outgoing colored console log
    if (window.localStorage['dtym_debug'] === 'true') {
      console.log(`%c→ ${message}`, 'color: #2C7C26;');
    }
  };

  // add a receive listener
  socket.receive = function (message, callback) {
    if (typeof (message) === 'string' && typeof (callback) === 'function') {
      Events[message] = socket.addEventListener('message', (connection) => {
        let data;
        try {
          data = JSON.parse(connection.data);
        } catch (e) {
          return;
        }
        if (data.message === message) {
          callback(data.data);
        }
      });
    }
  };

  // add incoming colored console log
  socket.addEventListener('message', (connection) => {
    let data;
    try {
      data = JSON.parse(connection.data);
    } catch (e) {
      return;
    }
    if (window.localStorage['dtym_debug'] === 'true') {
      console.log(`%c← ${data.message}`, 'color: #7C2626;text-align: right; margin-left: auto');
    }
  });
};
