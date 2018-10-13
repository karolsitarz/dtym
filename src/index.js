import React from 'react'
import ReactDOM from 'react-dom'

import style, { ThemeProvider } from 'styled-components'

import './styles/global-styles'
import theme from './styles/theme'

import Login from './sections/Login'

const RootStyle = style.div`
  height: 100%;
  width: 100%;

  &,
  &::before,
  &::after {
    color: ${props => props.theme.main_1}
  }
`

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: 'light'
    }
  }

  onThemeChange () {
    (this.state.theme === 'light') ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' })
  }

  render () {
    return (
      <ThemeProvider
        theme={theme[this.state.theme]} >
        <RootStyle>
          <Login
            themeChange={e => this.onThemeChange()} />
        </RootStyle>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
