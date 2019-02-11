export const changeTheme = darkMode => ({
  type: 'THEME_CHANGE',
  payload: typeof darkMode === 'boolean' ? darkMode : null
});

export const changeSection = section => ({
  type: 'SECTION_CHANGE',
  payload: typeof section === 'string' ? section : 'Login'
});

export const setSocket = socket => ({
  type: 'SOCKET_SET',
  payload: socket
});

export const joinLobby = ({ players, host, speaker }) => ({
  type: 'LOBBY_JOIN_YOU',
  payload: { players, host, speaker }
});

export const leaveLobby = () => ({
  type: 'LOBBY_LEAVE_YOU'
});

export const joinLobbyElse = player => ({
  type: 'LOBBY_JOIN_ELSE',
  payload: player
});

export const leaveLobbyElse = ({ player, host, speaker }) => ({
  type: 'LOBBY_LEAVE_ELSE',
  payload: { player, host, speaker }
});

export const updateLobbyHost = host => ({
  type: 'LOBBY_UPDATE_HOST',
  payload: host
});

export const updateLobbySpeaker = speaker => ({
  type: 'LOBBY_UPDATE_SPEAKER',
  payload: speaker
});

export const createModal = ({ title, desc, options }) => ({
  type: 'MODAL_CREATE',
  payload: { title, desc, options }
});

export const destroyModal = id => ({
  type: 'MODAL_DESTROY',
  payload: id
});
