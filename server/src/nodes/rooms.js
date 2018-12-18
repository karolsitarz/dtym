const randomize = require('randomatic');

module.exports = (app, socket) => {
  const getRoomsCounter = () => {
    app.ROOMNUMBER = ++app.ROOMNUMBER > 9999 ? 1000 : app.ROOMNUMBER;
    return app.ROOMNUMBER;
  };

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
      socket.commBroadcast.room(roomName).comm('room_joinRoom_else', { [socket.ID]: app.USERS[socket.ID] });
    }
  };

  socket.leaveRoom = (roomName = socket.currentRoom) => {
    const room = app.ROOMS[roomName];
    // if socket is not in any room
    if (socket.currentRoom != null &&
      // and it's in target room
      (socket.ID in room.players) &&
      // try to leave room
      room.leave(socket.ID)) {
      // set current room to target
      socket.currentRoom = null;

      // send the socket info that it left room
      socket.comm('room_leaveRoom_you');

      // broadcast room-leave info
      socket.commBroadcast.room(roomName).comm('room_leaveRoom_else', {
        host: room.host,
        speaker: room.speaker,
        player: socket.ID
      });
    }
  };

  class Room {
    constructor (data = {
      slots: 8,
      password: undefined,
      name: 'dtym_room'
    }) {
      this.ID = data.ID;
      this.name = data.name;
      this.password = data.password;
      this.slots = data.slots;
      this.number = getRoomsCounter();

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
        // delete this;
        delete app.ROOMS[this.ID];
        return true;
      }

      if (this.host === ID) this.host = Object.keys(this.players)[0];
      if (this.speaker === ID) this.speaker = Object.keys(this.players)[0];

      return true;
    }

    validate (password) {
      return password === this.password;
    }
  }

  socket.createRoom = (data) => {
    if (socket.currentRoom == null) {
      if (data.name.length <= 20 &&
          data.name.length >= 2 &&
          (!data.password ||
            (data.password.length <= 20 &&
              data.password.length > 0)) &&
          data.slots >= 4 &&
          data.slots <= 20) {
        // generate room hash
        let roomName = randomize('Aa0', 16);
        while (roomName in app.ROOMS) roomName = randomize('Aa0', 16);

        app.ROOMS[roomName] = new Room({
          name: data.name,
          password: data.password,
          slots: data.slots,
          ID: roomName
        });

        socket.joinRoom(roomName);
      }
    }
  };

  // COMMS

  socket.receive('room_leaveRoom', data => socket.leaveRoom());

  socket.receive('room_host_setSpeaker', playerID => {
    if (!socket.currentRoom ||
      !(socket.currentRoom in app.ROOMS) ||
      app.ROOMS[socket.currentRoom].host !== socket.ID ||
      app.ROOMS[socket.currentRoom].speaker === playerID) return;

    app.ROOMS[socket.currentRoom].speaker = playerID;
    socket.commAll.room(socket.currentRoom).comm('room_setSpeaker', playerID);
  });

  socket.receive('room_host_setHost', playerID => {
    if (!socket.currentRoom ||
      !(socket.currentRoom in app.ROOMS) ||
      app.ROOMS[socket.currentRoom].host !== socket.ID ||
      app.ROOMS[socket.currentRoom].host === playerID) return;

    app.ROOMS[socket.currentRoom].host = playerID;
    socket.commAll.room(socket.currentRoom).comm('room_setHost', playerID);
  });

  socket.receive('room_host_kick', playerID => {
    if (!socket.currentRoom ||
      !(socket.currentRoom in app.ROOMS) ||
      app.ROOMS[socket.currentRoom].host !== socket.ID ||
      !(playerID in app.ROOMS[socket.currentRoom].players) ||
      app.ROOMS[socket.currentRoom].host === playerID) return;

    app.USERS_REF[playerID].leaveRoom();
  });
};
