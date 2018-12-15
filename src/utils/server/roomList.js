module.exports = (app, socket) => {
  require('./rooms')(app, socket);

  socket.receive('room_createRoom', data => {
    socket.createRoom(data);
  });
};
