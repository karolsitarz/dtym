module.exports = (app, socket) => {
  require('./rooms')(app, socket);

  socket.receive('room_createRoom', data => {
    socket.createRoom(data);
  });

  socket.receive('roomList_refresh', () => {
    const roomList = [];
    for (let room in app.ROOMS) {
      roomList.push({
        id: room,
        name: app.ROOMS[room].name,
        password: !!app.ROOMS[room].password,
        playerCount: app.ROOMS[room].playerCount,
        slots: app.ROOMS[room].slots,
        number: app.ROOMS[room].number
      });
    }
    socket.comm('roomList_refresh', roomList);
  });

  socket.receive('room_joinRoomPrompt', ({ name, password }) => {
    // if does not have a password
    if (!app.ROOMS[name].password) {
      socket.joinRoom(name);
    } else {
      if (password && app.ROOMS[name].validate(password)) {
        socket.joinRoom(name);
      }
    }
  });
};
