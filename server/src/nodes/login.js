const getURISize = require('../util/getUriSize');
const randomize = require('randomatic');

module.exports = (app, socket) => {
  socket.receive('login_prompt', data => {
    if ('name' in data &&
    typeof (data.name) === 'string' &&
    data.name.length > 1 &&
    data.name.length <= 20 &&
    'avatar' in data &&
    getURISize(data.avatar) < 100000) {
      const thisSocket = app.USERS[socket.ID];
      thisSocket.name = data.name;
      thisSocket.avatar = data.avatar || app.defaultAvatar;
      socket.sessionKey = randomize('Aa0', 64);

      socket.comm('login_success', {
        name: thisSocket.name,
        avatar: thisSocket.avatar,
        sessionKey: socket.sessionKey,
        currentRoom: null
      });
    }
  });
};
