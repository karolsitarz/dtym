module.exports = (app, socket) => {
  require('../logic/rooms')(app, socket);

  socket.receive('room_createRoom', data => {
    socket.createRoom(data);
  });

  socket.receive('roomList_refresh', () => {
    const roomList = {};
    for (let room in app.ROOMS) {
      roomList[room] = {
        id: room,
        name: app.ROOMS[room].name,
        password: !!app.ROOMS[room].password,
        playerCount: app.ROOMS[room].playerCount,
        slots: app.ROOMS[room].slots
      };
    }
    socket.comm('roomList_refresh', roomList);
  });
};
