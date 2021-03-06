const mainTheme = {
  main_1: '#333',
  main_2: '#999999',
  main_3: `#868686`,
  main_4: `#666666`,
  main_5: `#555555`,

  white: '#ffffff',

  semi_0_5: '#00000007',
  semiTransparentValue: '#00000014',
  semi_2: '#00000028',

  backgroundColor: '#ffffff',
  bg_2: '#f7f7f7',

  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  g_25: '#6877e1',
  g_50: '#6e65c6',
  g_75: '#7452ab',
  mainGradient: 'linear-gradient(to bottom right, #667eea 0%, #764ba2 100%)',
  secondGradient: `linear-gradient(to bottom right, #d2d9f9 0%, #d6c7e5 100%)`,

  transition: ({ d = '.3', e = 'ease', t = ['opacity', 'transform'], dy = '0' }) => t.map(c => `${c} ${d}s ${e} ${dy}s`).toString()
};

export default {
  light: mainTheme,
  dark: Object.assign({}, mainTheme, {
    backgroundColor: '#333',
    white: '#eeeeee',
    bg_2: '#2b2b2b',
    main_1: '#eeeeee',
    main_4: '#bbbbbb',
    main_5: `#999999`,
    gradientStart: '#6377cf',
    gradientEnd: '#694f82',
    mainGradient: 'linear-gradient(to right bottom, #6377cf 0%, #694f82 100%)',
    secondGradient: `linear-gradient(to right bottom, #4b5271 0%, #4c3b5f 100%)`,
    semi_0_5: '#00000014',
    semiTransparentValue: '#00000028',
    semi_2: '#00000042'
  })
};
