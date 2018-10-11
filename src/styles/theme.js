const mainTheme = {
  semiTransparentValue: '#00000014',
  text: '#999999',
  mainGradient: 'linear-gradient(to bottom right, #667eea 0%, #764ba2 100%)'
}

export default {
  light: Object.assign({}, mainTheme, {
    backgroundColor: '#ffffff',
    white: '#ffffff'
  }),
  dark: Object.assign({}, mainTheme, {
    backgroundColor: '#333',
    white: '#eeeeee'
  })
}
