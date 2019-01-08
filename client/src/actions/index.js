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
