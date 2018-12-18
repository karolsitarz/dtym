module.exports = socket => {
  // add the events object
  socket.Events = {};
  socket.Debounce = {};
  const { Events, Debounce } = socket;

  const DEBOUNCE_DELAY = 300;

  // add the send event
  socket.comm = function (message = '', data = '') {
    if (typeof message === 'string') {
      if (!(message in Debounce)) {
        Debounce[message] = {
          d: 0,
          t: undefined
        };
      }
      if (new Date() - Debounce[message].d >= DEBOUNCE_DELAY) {
        this.send(JSON.stringify({ message, data }));
      } else {
        clearTimeout(Debounce[message].t);
        Debounce[message].t = setTimeout(t => socket.comm(message, data), DEBOUNCE_DELAY);
      }
      Debounce[message].d = new Date();
    }
    // add outgoing colored console log
    if (window.localStorage['dtym_debug'] === 'true') {
      console.log(`%c→ ${message}`, 'color: #2C7C26', data);
    }
  };

  socket.addEventListener('message', (connection) => {
    let data;
    try {
      data = JSON.parse(connection.data);
    } catch (e) {
      return;
    }
    if (data.message in Events) {
      Events[data.message](data.data);
    }
    // add incoming colored console log
    if (window.localStorage['dtym_debug'] === 'true') {
      console.log(`\t%c← ${data.message}`, 'color: #7C2626', data);
    }
  });

  // add a receive listener
  socket.receive = function (message, callback) {
    if (typeof (message) === 'string' && typeof (callback) === 'function') {
      Events[message] = callback;
    }
  };
};
