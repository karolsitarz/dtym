module.exports = (app, socket) => {
  // send event
  socket.comm = (message = '', data = '') => {
    if (typeof (message) === 'string') {
      try {
        socket.send(JSON.stringify({ message, data }));
      } catch (e) {
      }
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
      return {
        comm: (message = 'empty', data = '') => {
          if (typeof (message) === 'string' && roomName in app.ROOMS) {
            for (let socketID in app.ROOMS[roomName].players) {
              if (socketID !== socket.ID) {
                try {
                  app.USERS_REF[socketID].send(JSON.stringify({ message, data }));
                } catch (e) {
                  return;
                }
              }
            }
          }
        }
      };
    }
  };
};
