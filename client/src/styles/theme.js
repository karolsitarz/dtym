const mainTheme = {
  main_2: '#999999',
  main_3: `#868686`,
  main_4: `#666666`,
  main_5: `#555555`,
  transition: ({ d = '.3', e = 'ease', t = ['opacity', 'transform'] }) => t.map(c => `${c} ${d}s ${e}`).toString()
};

export default {
  light: Object.assign({}, mainTheme, {
    backgroundColor: '#ffffff',
    white: '#ffffff',
    bg_2: '#f7f7f7',
    main_1: '#333',
    mainGradient: 'linear-gradient(to bottom right, #667eea 0%, #764ba2 100%)',
    secondGradient: `linear-gradient(to bottom right, #d2d9f9 0%, #d6c7e5 100%)`,
    semiTransparentValue: '#00000014'
  }),
  dark: Object.assign({}, mainTheme, {
    backgroundColor: '#333',
    white: '#eeeeee',
    bg_2: '#2b2b2b',
    main_1: '#eeeeee',
    main_4: '#bbbbbb',
    main_5: `#999999`,
    mainGradient: 'linear-gradient(to right bottom, #6377cf 0%, #694f82 100%)',
    secondGradient: `linear-gradient(to right bottom, #4b5271 0%, #4c3b5f 100%)`,
    semiTransparentValue: '#00000028'
  })
};
