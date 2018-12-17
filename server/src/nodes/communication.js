module.exports = (app, socket) => {
  // send event
  socket.comm = (message = '', data = '') => {
    if (typeof (message) === 'string') {
      socket.send(JSON.stringify({ message, data }));
    }
  };

  // receive event
  socket.receive = (message, callback) => {
    if (typeof (message) === 'string' && typeof (callback) === 'function') {
      socket.on('message', connection => {
        let data;
        try {
          data = JSON.parse(connection);
        } catch (e) {
          Error('error inside receive function');
          return;
        }
        if (data.message === message) {
          callback(data.data);
        }
      });
    }
  };

  // display debug message
  socket.on('message', connection => {
    let data;
    try {
      data = JSON.parse(connection);
    } catch (e) {
      Error('error inside receive function');
      return;
    }
    console.log(`[DEBUG]  ${data.message}`);
  });

  // broadcast in room
  socket.commBroadcast = {
    room: roomName => {
      if (roomName in app.ROOMS) {
        return {
          comm: (message = 'empty', data = '') => {
            if (typeof (message) === 'string') {
              for (let socketID in app.ROOMS[roomName].players) {
                if (socketID !== socket.ID) {
                  app.USERS_REF[socketID].send(JSON.stringify({ message, data }));
                }
              }
            }
          }
        };
      }
    }
  };
};
