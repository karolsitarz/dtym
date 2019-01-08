import { combineReducers } from 'redux';

const themeReducer = (currentTheme = (window.localStorage.dtym_darkmode === 'true'), action) => {
  const ret = value => (window.localStorage.dtym_darkmode = value);

  if (action.type === 'THEME_CHANGE') {
    if (typeof action.payload === 'boolean') {
      ret(action.payload);
      return action.payload;
    } else {
      ret(!currentTheme);
      return !currentTheme;
    }
  }
  ret(currentTheme);
  return currentTheme;
};

const sectionReducer = (currentSection = 'Login', action) => {
  if (action.type === 'SECTION_CHANGE') return action.payload;

  return currentSection;
};

const socketReducer = (currentSocket = null, action) => {
  if (action.type === 'SOCKET_SET') return action.payload;

  return currentSocket;
};

const lobbyReducer = (currentData = { players: {}, host: '', speaker: '' }, action) => {
  if (action.type === 'LOBBY_JOIN_YOU') {
    const { players, host, speaker } = action.payload;
    return { players, host, speaker };
  }
  if (action.type === 'LOBBY_LEAVE_YOU') return {};
  if (action.type === 'LOBBY_JOIN_ELSE') {
    return {
      ...currentData,
      players: {
        ...currentData.players,
        ...action.payload
      }
    };
  }
  if (action.type === 'LOBBY_LEAVE_ELSE') {
    const { player, host, speaker } = action.payload;
    const newPlayers = { ...currentData.players };
    delete newPlayers[player];

    return {
      ...currentData,
      players: newPlayers,
      host,
      speaker
    };
  }
  if (action.type === 'LOBBY_UPDATE_HOST') {
    return {
      ...currentData,
      host: action.payload
    };
  }
  if (action.type === 'LOBBY_UPDATE_SPEAKER') {
    return {
      ...currentData,
      speaker: action.payload
    };
  }

  return currentData;
};

export default combineReducers({
  socket: socketReducer,
  theme: themeReducer,
  section: sectionReducer,
  lobby: lobbyReducer
});
