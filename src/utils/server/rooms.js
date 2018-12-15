const randomize = require('randomatic');

module.exports = (app, socket) => {
  socket.joinRoom = (roomName) => {
    const room = app.ROOMS[roomName];
    // if socket is not in any room
    if (socket.currentRoom == null &&
    // and it's not in target room
    !(socket.ID in room.players) &&
    // try to join room
    room.join(socket.ID)) {
      // set current room to target
      socket.currentRoom = roomName;

      // send the socket info that it joined room
      socket.comm('room_joinRoom_you', {
        host: room.host,
        speaker: room.speaker,
        players: room.players
      });

      // broadcast room-join info
      socket.commBroadcast.room(roomName).comm('room_joinRoom_you', {
        host: room.host,
        speaker: room.speaker,
        players: room.players
      });
    }
  };

  socket.leaveRoom = (roomName) => {
    // if socket is not in any room
    if (socket.currentRoom != null &&
      // and it's not in target room
      (socket.ID in app.ROOMS[roomName].players)) {
      if (app.ROOMS[roomName].leave(socket.ID)) {
        // set current room to target
        socket.currentRoom = null;
      }
    }
  };

  class Room {
    constructor (data = {
      slots: 8,
      password: undefined,
      name: 'dtym_room'
    }) {
      this.name = data.name;
      this.password = data.password;
      this.slots = data.slots;

      this.players = {};
      this.playerCount = 0;
      this.canJoin = true;

      this.host = null;
      this.speaker = null;
    }

    join (ID) {
      if (this.playerCount < this.slots) {
        this.players[ID] = app.USERS[ID];
        this.playerCount++;

        if (!this.host) this.host = ID;
        if (!this.speaker) this.speaker = ID;

        return true;
      } else return false;
    }

    leave (ID) {
      delete this.players[ID];
      this.playerCount--;

      if (this.playerCount < 1) {
        delete this;
        return true;
      }

      if (this.host === ID) this.host = Object.keys(this.players)[0];
      if (this.speaker === ID) this.speaker = Object.keys(this.players)[0];

      return true;
    }
  }

  socket.createRoom = (data) => {
    if (data.name.length <= 20 &&
        data.name.length >= 2 &&
        (!data.password ||
          (data.password.length <= 20 &&
            data.password.length > 0)) &&
        data.slots >= 4 &&
        data.slots <= 20) {
      // generate room hash
      let roomName = randomize('Aa0', 5);
      while (roomName in app.ROOMS) roomName = randomize('Aa0', 5);

      app.ROOMS[roomName] = new Room({
        name: data.name,
        password: data.password,
        slots: data.slots
      });

      socket.joinRoom(roomName);
    }
  };
};
