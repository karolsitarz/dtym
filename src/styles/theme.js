const mainTheme = {
  semiTransparentValue: '#00000014',
  main_2: '#999999',
  main_3: `#868686`,
  main_4: `#666666`
}

export default {
  light: Object.assign({}, mainTheme, {
    backgroundColor: '#ffffff',
    white: '#ffffff',
    main_1: '#333',
    mainGradient: 'linear-gradient(to bottom right, #667eea 0%, #764ba2 100%)',
    secondGradient: `linear-gradient(to bottom right, #d2d9f9 0%, #d6c7e5 100%)`
  }),
  dark: Object.assign({}, mainTheme, {
    backgroundColor: '#333',
    white: '#eeeeee',
    main_1: '#eeeeee',
    main_4: '#bbbbbb',
    mainGradient: 'linear-gradient(to right bottom, #6377cf 0%, #694f82 100%)',
    secondGradient: `linear-gradient(to right bottom, #363e63 0%, #56436b 100%)`
  })
}
