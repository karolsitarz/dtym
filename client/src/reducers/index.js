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

export default combineReducers({
  socket: socketReducer,
  theme: themeReducer,
  section: sectionReducer
});
